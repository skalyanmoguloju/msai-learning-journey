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
            title: 'Mathematics & Optimization for AI',
            description: 'Linear algebra factorizations (LU, SVD), multivariable gradients (∇f), probability distributions, and 1st & 2nd order optimization algorithms.',
            topics: [
              'Linear Algebra & Matrix Factorizations (LU, SVD)',
              'Multivariable Calculus & Gradients (∇f)',
              'Probabilistic Foundations & Distributions',
              'First-Order Optimization (SGD, Momentum, Adam)',
              'Second-Order Optimization (Newton, Hessian, L-BFGS)'
            ],
            status: 'in-progress',
            reading: 'Mitchell Ch. 2 / Goodfellow Deep Learning Ch. 2–4'
          },
          {
            id: 'm252-3',
            week: 'Week 03',
            title: 'Neural Networks & Back-propagation',
            description: 'Perceptrons, activation functions, dynamic gradient computation, and loss surface traversal.',
            topics: [
              'Perceptrons and linear classifiers',
              'Perceptron training',
              'From perceptrons to neural networks',
              'Activation functions',
              'Training a multilayer neural network',
              'Forward propagation and backpropagation',
              'Universal approximation',
              'Weight initialization',
              'Monitoring neural-network training',
              'Learning settings beyond ordinary supervised learning',
              'Few-shot and transfer learning',
              'Contrastive learning and SimCLR'
            ],
            status: 'completed',
            reading: 'Goodfellow Ch. 6'
          },
          {
            id: 'm252-4',
            week: 'Week 04',
            title: 'Deep Neural Networks, Sequence & Spatial Models',
            description: 'Advanced deep learning architectures for structured spatial and sequential signal data: CNNs, Transformers, and Recurrent Networks.',
            topics: [
              'Deep learning and feature learning',
              'Why convolutional neural networks?',
              'Important CNN architectures',
              'Transformers and self-attention',
              'Basic recurrent neural networks',
              'RNN loss and training',
              'GRU',
              'LSTM',
              'Bidirectional RNNs'
            ],
            status: 'in-progress',
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
              description: 'Delivering group paper review and architectural critique during scheduled course weeks.',
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
              speakerNotes: 'Introduce the core project motivations, problem scoping, and technical architecture.'
            }
          ]
        },
        assignments: [
          {
            id: 'cmpe252-m1-proposal',
            title: 'Project Proposal & Literature Review',
            category: 'Proposal',
            dueDate: '2026-10-14',
            status: 'pending',
            weight: '10% of Final Project',
            description: 'Formulate core project objectives, acquire and preprocess multi-modal datasets, conduct a comprehensive literature survey, and establish evaluation baselines for Dr. Gautam Krishna.',
            requirements: [
              'Submit a 1-2 page proposal outlining research goals, dataset provenance, and team responsibilities.',
              'Define rigorous data preprocessing pipelines (e.g. spectrogram conversion for audio, spatial normalizations for vision).',
              'Review at least 3 state-of-the-art peer-reviewed publications relevant to the proposed architecture.',
              'Specify milestone execution timeline and baseline performance targets.'
            ],
            documents: [
              {
                title: 'Week 1: Data-Driven Methods (Lecture Slides)',
                url: 'documents/cmpe-252/week-01/data-driven-methods.pdf',
                type: 'pdf',
                description: 'Foundations of data representations, feature learning, and inductive biases.',
                size: '1.2 MB'
              },
              {
                title: 'Week 2: AI Basics Continued (Lecture Slides)',
                url: 'documents/cmpe-252/week-02/lecture-02-ai-basics-continued.pdf',
                type: 'pdf',
                description: 'Matrix decompositions, gradient vectors, eigenvalues, and SVD.',
                size: '1.4 MB'
              },
              {
                title: 'Week 3: Neural Networks Foundations (Lecture Slides)',
                url: 'documents/cmpe-252/week-03/lecture-03-neural-networks-deep-learning.pdf',
                type: 'pdf',
                description: 'Biological inspiration, perceptrons, backpropagation, and loss functions.',
                size: '2.8 MB'
              },
              {
                title: 'Capstone Proposal Guidelines & Rubric',
                url: 'https://sjsu.instructure.com/courses/1635708',
                type: 'canvas',
                description: 'Official SJSU Canvas submission portal, rubric, and format specifications.'
              }
            ],
            submissionUrl: 'https://sjsu.instructure.com/courses/1635708',
            relatedProjectDeliverableId: 'd1'
          },
          {
            id: 'cmpe252-m2-paper-review',
            title: 'In-Class Paper Presentation & Technical Review',
            category: 'Presentation',
            dueDate: '2026-11-18',
            status: 'pending',
            weight: '50% of Course Grade',
            description: 'Deliver an in-class technical presentation (group of 3) reviewing and critically evaluating a high-impact AI research paper, followed by a live defense with Dr. Gautam Krishna.',
            requirements: [
              '20-minute slide presentation followed by 5-minute technical Q&A defense.',
              'Deep mathematical walkthrough of the core loss functions, model architecture, and optimization.',
              'Empirical analysis of benchmark results, experimental replication, and ablation insights.',
              'Critical discussion of limitations, inductive bias trade-offs, and future research directions.'
            ],
            documents: [
              {
                title: 'Week 3: Neural Networks & Backprop Slides',
                url: 'documents/cmpe-252/week-03/lecture-03-neural-networks-deep-learning.pdf',
                type: 'pdf',
                description: 'Reference slides for backpropagation, activation functions, and optimization.',
                size: '2.8 MB'
              },
              {
                title: 'Week 4: CNNs, Transformers & RNNs (Lecture Slides)',
                url: 'documents/cmpe-252/week-04/lecture-04-deep-networks-cnns-transformers-rnns.pdf',
                type: 'pdf',
                description: 'Comprehensive slides covering modern vision backbones, attention, and recurrence.',
                size: '5.7 MB'
              },
              {
                title: 'Paper Presentation Slide Template',
                url: 'https://sjsu.instructure.com/courses/1635708',
                type: 'rubric',
                description: 'Recommended slide deck structure, presentation timing, and grading rubric.'
              }
            ],
            submissionUrl: 'https://sjsu.instructure.com/courses/1635708',
            relatedProjectDeliverableId: 'd2'
          },
          {
            id: 'cmpe252-m3-system-pipeline',
            title: 'Model Pipeline Implementation & Benchmark Milestone',
            category: 'Milestone',
            dueDate: '2026-11-25',
            status: 'pending',
            weight: '10% of Final Project',
            description: 'Implement end-to-end data pipelines and baseline deep neural architectures (CNN, Transformer, or Generative Autoencoder), establishing empirical benchmark comparisons.',
            requirements: [
              'Fully functional data loading, tokenization/augmentation, and tensor processing pipeline.',
              'Baseline neural network implementation with reproducible training curves and validation logging.',
              'Comparative evaluation table against linear/classical baselines.',
              'Interim milestone summary and code repository check-in.'
            ],
            documents: [
              {
                title: 'Week 4: CNNs, Transformers & RNNs (Lecture Slides)',
                url: 'documents/cmpe-252/week-04/lecture-04-deep-networks-cnns-transformers-rnns.pdf',
                type: 'pdf',
                description: 'Architectures for feature extraction and sequence modeling.',
                size: '5.7 MB'
              },
              {
                title: 'Week 4: RNN, GRU & LSTM (Handwritten Notes)',
                url: 'documents/cmpe-252/week-04/lecture-04-handwritten-notes-rnn-gru-lstm.pdf',
                type: 'pdf',
                description: 'Handwritten mathematical derivations for recurrent cells, gating, and BPTT.',
                size: '957 KB'
              },
              {
                title: 'Capstone GitHub Repository',
                url: 'https://github.com/sjsu-msai/cmpe252-ai-data-engineering',
                type: 'github',
                description: 'Project code repository with environment setup, baseline models, and datasets.'
              }
            ],
            submissionUrl: 'https://github.com/sjsu-msai/cmpe252-ai-data-engineering'
          },
          {
            id: 'cmpe252-m4-oral-exam',
            title: 'Final Project Presentation & Oral Examination',
            category: 'Exam',
            dueDate: '2026-12-09',
            status: 'pending',
            weight: '30% of Course Grade',
            description: 'Individual and group oral examination with Dr. Gautam Krishna defending all theoretical concepts from Weeks 1-14 and showcasing live system inference performance.',
            requirements: [
              'Live interactive demonstration of inference pipeline and evaluation on unseen test data.',
              'Individual oral defense answering rigorous theoretical questions on optimization, backprop, CNNs, Transformers, and RNNs.',
              'Comprehensive slide deck summarizing results, error analysis, and ablations.'
            ],
            documents: [
              {
                title: 'Oral Examination Guidelines & Topic Coverage',
                url: 'https://sjsu.instructure.com/courses/1635708',
                type: 'rubric',
                description: 'Detailed rubric on individual grading breakdown and required theoretical mastery.'
              },
              {
                title: 'Live System Demonstration Portal',
                url: 'https://cmpe252-demo.sjsu-ai.internal',
                type: 'link',
                description: 'Interactive demo interface for real-time model inference and visualization.'
              }
            ],
            relatedProjectDeliverableId: 'd3'
          },
          {
            id: 'cmpe252-m5-final-report',
            title: 'Final Project Written Report & Codebase Submission',
            category: 'Report',
            dueDate: '2026-12-16',
            status: 'pending',
            weight: '20% of Final Project',
            description: 'Submission of conference-style final paper (IEEE format) detailing problem statement, methodology, architectural diagrams, empirical results, ablations, and reproducible codebase.',
            requirements: [
              '6-8 page IEEE double-column conference format paper with abstract, math formulations, and citations.',
              'Rigorous ablation study validating design choices (e.g. depth, attention heads, regularizers).',
              'Clean, documented GitHub repository with README, environment YAML/requirements.txt, and checkpoint weights.',
              'Contribution statement itemizing individual member responsibilities.'
            ],
            documents: [
              {
                title: 'IEEE Conference Paper Template (LaTeX / Overleaf)',
                url: 'https://www.ieee.org/conferences/publishing/templates.html',
                type: 'rubric',
                description: 'Official IEEE double-column conference proceedings formatting template.'
              },
              {
                title: 'Final Report Canvas Submission Portal',
                url: 'https://sjsu.instructure.com/courses/1635708',
                type: 'canvas',
                description: 'Final submission portal on Canvas for PDF report and codebase archive.'
              }
            ],
            submissionUrl: 'https://sjsu.instructure.com/courses/1635708',
            relatedProjectDeliverableId: 'd4'
          }
        ]
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
            week: 'Week 01',
            title: 'Introduction to Machine Learning',
            description: 'Fundamental principles, algorithms, applications, mathematical modeling, and learning feasibility.',
            topics: ['Supervised vs Unsupervised Learning', 'Feasibility of Learning', 'Generalization Principles', 'Linear Algebra & Calculus Foundations'],
            status: 'completed',
            reading: 'CS229 Notes Section 1 & Syllabus'
          },
          {
            id: 'm257-2',
            week: 'Week 02',
            title: 'Logistic Regression, GLMs & Probabilistic Models',
            description: 'Why logistic regression is needed, sigmoid activation, Bernoulli likelihood, dataset log-likelihood, gradient ascent, GLMs, exponential family, Naive Bayes, and MLE vs MAP.',
            topics: [
              'Why logistic regression is needed',
              'Sigmoid function',
              'Bernoulli probability and one-example likelihood',
              'Dataset likelihood and log-likelihood',
              'Gradient derivation and gradient ascent',
              'Generalized Linear Models',
              'Exponential family',
              'Constructing GLMs',
              'Naive Bayes',
              'MLE versus MAP'
            ],
            status: 'completed',
            reading: 'CS229 Notes Chapter 1 & Chapter 2'
          },
          {
            id: 'm257-3',
            week: 'Week 03',
            title: 'Decision Trees & Ensemble Methods',
            description: 'Why decision trees, decision-tree fundamentals, classification trees and split criteria, regression trees and CART, bagging and random forests, and gradient boosting.',
            topics: [
              'Why decision trees?',
              'Decision-tree fundamentals',
              'Classification trees and split criteria',
              'Regression trees and CART',
              'Bagging and random forests',
              'Gradient boosting and final comparison'
            ],
            status: 'completed',
            reading: 'Breiman et al. (1984), Breiman (2001), Friedman (2001)'
          },
          {
            id: 'm257-4',
            week: 'Week 04',
            title: 'Instance-Based Learning, Generative Classifiers, K-Means & GMM',
            description: 'KNN distance metrics, weighted voting, Generative vs. Discriminative models, Gaussian Discriminant Analysis, Naive Bayes, K-Means clustering, Gaussian Mixture Models, and EM.',
            topics: [
              'Instance-based learning and KNN foundations',
              'KNN representation, distance, weighted KNN',
              'Generative versus discriminative learning',
              'Gaussian Discriminant Analysis',
              'Naive Bayes',
              'Unsupervised learning and K-means',
              'Gaussian Mixture Models and EM',
              'Jensen’s inequality, ELBO, and mixture extensions'
            ],
            status: 'completed',
            reading: 'Cover & Hart (1967), Ng & Jordan (2001), Dempster et al. (1977)'
          },
          {
            id: 'm257-5',
            week: 'Week 05',
            title: 'Support Vector Machines, Margins, Kernels & Optimization',
            description: 'Hyperplanes, maximal-margin classification, soft margins and slack variables, feature expansion, the Kernel trick, multiclass SVM, regularization, and optimization algorithms.',
            topics: [
              'Hyperplanes and linear classification',
              'Maximal-margin classifier',
              'Support vector classifier and soft margins',
              'Feature expansion and nonlinear boundaries',
              'SVMs and kernel functions',
              'Multiclass SVM and confidence',
              'Regularization and bias–variance',
              'Optimization methods'
            ],
            status: 'completed',
            reading: 'Cortes & Vapnik (1995), Mercer (1909), Platt (1998)'
          },
          {
            id: 'm257-6',
            week: 'Week 06',
            title: 'MidTerm Exam Prep',
            description: 'Midterm preparation and practice problem review covering supervised learning, classification, regression, SVMs, and generative models.',
            topics: ['Exam Logistics & Rules', '10 Worked Sample Questions', 'Supervised Learning Review', 'CS229 Cheatsheet & Interview Prep'],
            status: 'completed',
            reading: 'Midterm Exam Prep Slides & CS229 Cheatsheet'
          },
          {
            id: 'm257-7',
            week: 'Week 07',
            title: 'Mid Term Exam',
            description: 'In-class midterm assessment covering Weeks 1-6. Homework 2 due.',
            topics: ['Midterm Examination', 'HW2 Due: Unsupervised Learning'],
            status: 'upcoming',
            reading: 'Review Weeks 1-6 Notes'
          },
          {
            id: 'm257-8',
            week: 'Week 08',
            title: 'Introduction to Neural Networks',
            description: 'Biological inspiration, perceptrons, multilayer perceptron architectures, and activation functions.',
            topics: ['Perceptron Learning Rule', 'Multilayer Perceptrons (MLPs)', 'Activation Functions (ReLU, Sigmoid, Softmax)', 'Forward Propagation'],
            status: 'upcoming',
            reading: 'Bishop Ch. 5 & CS229 Neural Network Notes'
          },
          {
            id: 'm257-9',
            week: 'Week 09',
            title: 'Back Propagation Algorithm - Part I',
            description: 'Mathematical derivation of backpropagation using the multivariate chain rule and computational graphs.',
            topics: ['Computational Graphs', 'Gradient Derivation via Chain Rule', 'Error Vector Propagation', 'Matrix Calculus for NN Updates'],
            status: 'upcoming',
            reading: 'CS229 Deep Learning Section'
          },
          {
            id: 'm257-10',
            week: 'Week 10',
            title: 'Back Propagation Algorithm - Part II',
            description: 'Advanced optimization algorithms, gradient challenges, and training dynamics. Homework 3 due.',
            topics: ['SGD, Adam, and RMSprop Optimizers', 'Exploding & Vanishing Gradients', 'HW3 Due: Back-propagation Algorithm'],
            status: 'upcoming',
            reading: 'Géron Ch. 11'
          },
          {
            id: 'm257-11',
            week: 'Week 11',
            title: 'Speech Recognition and Recommendation Systems',
            description: 'Applied machine learning architectures for sequential speech inputs and collaborative filtering systems.',
            topics: ['Acoustic & Speech Modeling Principles', 'Collaborative Filtering & Matrix Factorization', 'Content-Based Recommendation Engines'],
            status: 'upcoming',
            reading: 'Selected Industry Papers & Notes'
          },
          {
            id: 'm257-12',
            week: 'Week 12',
            title: 'Introduction to Deep Learning - Part 1',
            description: 'Deep neural network architectures, spatial features, and convolutional representation learning.',
            topics: ['Convolutional Neural Networks (CNNs)', 'Pooling & Feature Maps', 'Batch Normalization', 'Transfer Learning'],
            status: 'upcoming',
            reading: 'Géron Ch. 14'
          },
          {
            id: 'm257-13',
            week: 'Week 13',
            title: 'Introduction to Deep Learning - Part 2',
            description: 'Recurrent structures, sequence modeling, attention, and deep regularization. Homework 4 due.',
            topics: ['Recurrent Structures & Transformers', 'Regularization in Deep Networks (Dropout)', 'HW4 Due: Neural Networks'],
            status: 'upcoming',
            reading: 'Géron Ch. 15, 16'
          },
          {
            id: 'm257-14',
            week: 'Week 14',
            title: 'Project Presentation',
            description: 'Student research group presentations showcasing hands-on final machine learning projects.',
            topics: ['Applied ML Final Presentations', 'System Demos', 'Model Evaluation Reviews'],
            status: 'upcoming',
            reading: 'Final Project Submission Guidelines'
          },
          {
            id: 'm257-15',
            week: 'Week 15',
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
            week: 'Week 02',
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
              description: 'Presenting technical methodologies, complexity trade-offs, and experimental findings in Week 14.',
              tool: 'Week 14 Presentation'
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
            { label: 'Midterm Exam', value: '25% Weight', baseline: 'Week 07 (10/02)', change: 'In-Class' },
            { label: 'Homeworks (4 HWs)', value: '25% Weight', baseline: 'Weeks 04, 07, 10, 13', change: 'Mandatory' },
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
            { id: 'd6', title: 'In-Class Project Presentation (Week 14)', completed: false, dueDate: '2026-11-20' },
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
              speakerNotes: 'Walk through machine learning problem formulation, loss objectives, and empirical setup.'
            }
          ]
        },
        assignments: [
          {
            id: 'cmpe257-m1-hw1',
            title: 'Homework 1: Supervised Learning & Linear Models',
            category: 'Assignment',
            dueDate: '2026-09-11',
            status: 'completed',
            weight: '6.25% of Course Grade',
            description: 'Implement foundational supervised learning algorithms from scratch without external ML libraries: Linear Regression (Normal Equation & Gradient Descent) and Logistic Regression.',
            requirements: [
              'Derive the matrix formulation for the Ordinary Least Squares (OLS) normal equation: w = (X^T X)^{-1} X^T y.',
              'Implement Batch and Stochastic Gradient Descent with dynamic learning rate decay.',
              'Build binary Logistic Regression with log-loss optimization and decision threshold tuning.',
              'Submit documented Jupyter Notebook with empirical convergence plots and performance metrics (RMSE, Accuracy, F1).'
            ],
            documents: [
              {
                title: 'Session 1: Introduction to Machine Learning (Slides)',
                url: 'documents/cmpe-257/week-01/session1.pdf',
                type: 'pdf',
                description: 'Foundations of learning paradigms, hypothesis spaces, and inductive biases.',
                size: '1.8 MB'
              },
              {
                title: 'Andrew Ng CS229: Supervised Learning Notes',
                url: 'https://cs229.stanford.edu/main_notes.pdf',
                type: 'pdf',
                description: 'Comprehensive Stanford CS229 lecture notes on linear classification and LMS algorithms.'
              },
              {
                title: 'Homework 1 Starter Code & Canvas Portal',
                url: 'https://sjsu.instructure.com/courses/1635708',
                type: 'canvas',
                description: 'Canvas submission portal with starter notebook and synthetic test benchmarks.'
              }
            ],
            submissionUrl: 'https://sjsu.instructure.com/courses/1635708',
            relatedProjectDeliverableId: 'd1'
          },
          {
            id: 'cmpe257-m2-hw2',
            title: 'Homework 2: Unsupervised Learning & PCA',
            category: 'Assignment',
            dueDate: '2026-10-02',
            status: 'pending',
            weight: '6.25% of Course Grade',
            description: 'Implement Principal Component Analysis (eigen-decomposition and SVD) alongside K-Means and Expectation-Maximization (GMM) clustering algorithms.',
            requirements: [
              'Compute the empirical covariance matrix and solve for principal orthogonal eigenvectors.',
              'Verify variance retention ratio vs number of principal components (Elbow curve / scree plot).',
              'Implement K-Means clustering with K-Means++ initialization and silhouette score evaluation.',
              'Compare cluster purity and reconstruction error across dimensionality-reduced datasets.'
            ],
            documents: [
              {
                title: 'Session 2: Unsupervised Learning & Clustering (Slides)',
                url: 'documents/cmpe-257/week-02/session2.pdf',
                type: 'pdf',
                description: 'Eigenvectors, variance maximization, distance metrics, and clustering.',
                size: '2.1 MB'
              },
              {
                title: 'Homework 2 Starter Notebook',
                url: 'https://sjsu.instructure.com/courses/1635708',
                type: 'notebook',
                description: 'Jupyter template with data loaders for Iris, Wine, and MNIST subsets.'
              }
            ],
            submissionUrl: 'https://sjsu.instructure.com/courses/1635708',
            relatedProjectDeliverableId: 'd2'
          },
          {
            id: 'cmpe257-m3-midterm',
            title: 'In-Class Midterm Examination',
            category: 'Exam',
            dueDate: '2026-10-02',
            status: 'pending',
            weight: '25% of Course Grade',
            description: 'Comprehensive in-person examination covering theoretical principles, mathematical derivations, and algorithm design from Weeks 1 through 7 with Dr. Zara Hajihashemi.',
            requirements: [
              'In-person written exam (ENG 337).',
              'Topics: Linear regression, Logistic regression, Perceptrons, SVMs (Primal & Dual), Kernels, PCA, and Decision Trees.',
              'One double-sided handwritten 8.5x11 formula sheet permitted.'
            ],
            documents: [
              {
                title: 'Midterm Comprehensive Study Guide & Practice Problems',
                url: 'https://sjsu.instructure.com/courses/1635708',
                type: 'rubric',
                description: 'Detailed topic review breakdown, sample exam problems, and formula references.'
              }
            ],
            relatedProjectDeliverableId: 'd3'
          },
          {
            id: 'cmpe257-m4-hw3',
            title: 'Homework 3: Back-propagation & MLPs',
            category: 'Assignment',
            dueDate: '2026-10-23',
            status: 'pending',
            weight: '6.25% of Course Grade',
            description: 'Construct a modular multi-layer perceptron library from scratch with customizable activation layers, forward passes, and backward chain-rule gradient propagation.',
            requirements: [
              'Implement modular layer classes: Linear, ReLU, Sigmoid, and SoftmaxCrossEntropyLoss.',
              'Verify analytical gradients using numerical finite-difference gradient checking (tolerance < 1e-6).',
              'Train on non-linearly separable datasets (Spiral and Moons) and plot decision boundaries.',
              'Analyze the impact of He vs Xavier weight initialization on gradient propagation.'
            ],
            documents: [
              {
                title: 'Neural Network Derivations & Backprop Guide',
                url: 'https://sjsu.instructure.com/courses/1635708',
                type: 'pdf',
                description: 'Matrix calculus derivations for Jacobians and backward sensitivity vectors.'
              }
            ],
            submissionUrl: 'https://sjsu.instructure.com/courses/1635708',
            relatedProjectDeliverableId: 'd4'
          },
          {
            id: 'cmpe257-m5-hw4',
            title: 'Homework 4: Neural Networks & Deep Learning',
            category: 'Assignment',
            dueDate: '2026-11-13',
            status: 'pending',
            weight: '6.25% of Course Grade',
            description: 'Train and evaluate Convolutional Neural Networks and modern regularizers (Dropout, Batch Normalization, Weight Decay) on complex multi-class image benchmarks.',
            requirements: [
              'Build and train custom CNN architectures (comparing standard vs residual blocks).',
              'Conduct ablation studies evaluating the effectiveness of Data Augmentation and Dropout.',
              'Plot loss curves, confusion matrices, and feature activation maps for misclassified instances.'
            ],
            documents: [
              {
                title: 'Deep Learning Practical Guidelines (Goodfellow Ch. 11)',
                url: 'https://www.deeplearningbook.org/',
                type: 'link',
                description: 'Hyperparameter tuning, performance metrics, and debugging strategies.'
              }
            ],
            submissionUrl: 'https://sjsu.instructure.com/courses/1635708',
            relatedProjectDeliverableId: 'd5'
          },
          {
            id: 'cmpe257-m6-presentation',
            title: 'In-Class Project Presentation (Week 14)',
            category: 'Presentation',
            dueDate: '2026-11-20',
            status: 'pending',
            weight: '10% of Final Project',
            description: 'In-class group presentation presenting project problem formulation, dataset characteristics, baseline models, novel technical contributions, and empirical results.',
            requirements: [
              '15-minute slide presentation followed by 5-minute Q&A.',
              'Slide deck must follow conference presentation standards (clean visuals, no text walls).',
              'Demonstration of baseline comparison and ablation studies.'
            ],
            documents: [
              {
                title: 'Project Presentation Rubric & Guidelines',
                url: 'https://sjsu.instructure.com/courses/1635708',
                type: 'rubric',
                description: 'Evaluation criteria covering clarity, technical depth, and presentation defense.'
              }
            ],
            relatedProjectDeliverableId: 'd6'
          },
          {
            id: 'cmpe257-m7-final-exam',
            title: 'In-Class Final Examination',
            category: 'Exam',
            dueDate: '2026-12-09',
            status: 'pending',
            weight: '25% of Course Grade',
            description: 'Comprehensive course examination covering all topics from Weeks 1 through 15 (8:30 AM - 10:30 AM in ENG 337).',
            requirements: [
              'In-person final exam testing conceptual synthesis across classical ML and modern deep architectures.',
              'Two double-sided handwritten 8.5x11 cheat sheets permitted.'
            ],
            documents: [
              {
                title: 'Final Examination Review Syllabus',
                url: 'https://sjsu.instructure.com/courses/1635708',
                type: 'rubric',
                description: 'Comprehensive topic review and practice problem collection.'
              }
            ],
            relatedProjectDeliverableId: 'd7'
          },
          {
            id: 'cmpe257-m8-final-report',
            title: 'Final Project Written Report & Codebase Submission',
            category: 'Report',
            dueDate: '2026-12-14',
            status: 'pending',
            weight: '15% of Final Project',
            description: 'Final submission of research paper and documented codebase embodying the full applied machine learning workflow.',
            requirements: [
              'Comprehensive conference-format written paper with clear mathematical formulation and error analysis.',
              'Fully reproducible GitHub repository with documented training instructions and environment files.',
              'Team contribution matrix.'
            ],
            documents: [
              {
                title: 'Final Project Report Submission Portal',
                url: 'https://sjsu.instructure.com/courses/1635708',
                type: 'canvas',
                description: 'Canvas submission portal for final report PDF and GitHub link.'
              }
            ],
            submissionUrl: 'https://sjsu.instructure.com/courses/1635708',
            relatedProjectDeliverableId: 'd8'
          }
        ]
      }
    ]
  }
];