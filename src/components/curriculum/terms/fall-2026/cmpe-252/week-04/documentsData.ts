import { CourseDocumentItem } from '../../../../common';

export const AI_WEEK4_DOCUMENTS: CourseDocumentItem[] = [
  {
    id: 'w4-doc-cnn-transformer-rnn-slides',
    title: 'Deep Learning: CNNs, Transformers & RNNs (Lecture Slides)',
    fileUrl: 'documents/cmpe-252/week-04/lecture-04-deep-networks-cnns-transformers-rnns.pdf',
    fileName: 'Deep_Networks_CNNs_Transformers_RNNs_Slides.pdf',
    fileSize: '5.7 MB',
    pageCount: 29,
    category: 'Lecture Slides',
    topics: [
      'Turing Award Pioneers (LeCun, Hinton, Bengio)',
      'Feature Learning Hierarchy (Low, Mid, High Level)',
      'Spatial Low-Level Vision & Filter Banks',
      'From Fully Connected to Convolutional Networks',
      'LeNet-5, AlexNet, VGG-Net (3×3 Convolutions)',
      'Deep Residual Networks (ResNet Skip Connections)',
      'Fully Convolutional Networks (FCN Semantic Segmentation)',
      'Depthwise-Separable Convolutions & MobileNet',
      '3D Convolutional Networks (Temporal Coherence)',
      'Transformers & Self-Attention (Query, Key, Value)',
      'Multi-Headed Attention & Scaled Dot-Product',
      'Recurrent Neural Networks (RNN) & LSTM Gating'
    ]
  },
  {
    id: 'w4-doc-rnn-gru-lstm-notes',
    title: 'Recurrent Models: RNN, GRU, LSTM & BiRNN (Handwritten Notes)',
    fileUrl: 'documents/cmpe-252/week-04/lecture-04-handwritten-notes-rnn-gru-lstm.pdf',
    fileName: 'Recurrent_Networks_GRU_LSTM_Handwritten_Notes.pdf',
    fileSize: '957 KB',
    pageCount: 11,
    category: 'Lecture Notes',
    topics: [
      'Basic Recurrent Neural Network (RNN) Cell & Unfolding',
      'Recurrent Activation Transitions: a_t = g(W_a a_{t-1} + W_x x_t + b_a)',
      'Cross-Entropy Sequence Loss & Temporal Summation',
      'Vanishing Gradients & BPTT Bottlenecks',
      'Gated Recurrent Unit (GRU) Formulation',
      'Candidate State c_t~ & Update Gate Gamma_u',
      'Reset Gate Gamma_r & Gated Linear Interpolation',
      'Long Short-Term Memory (LSTM) Formulation',
      'Forget Gate Gamma_f, Input Gate Gamma_u, Output Gate Gamma_o',
      'Additive Cell State Highway & Hidden State Projection',
      'Bidirectional RNN (Forward & Backward Activations)'
    ]
  }
];
