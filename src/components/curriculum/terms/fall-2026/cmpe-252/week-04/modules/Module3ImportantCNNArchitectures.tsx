import React, { useState } from 'react';
import {
  Sparkles,
  Cpu,
  Layers,
  Sliders,
  ArrowRight,
  TrendingDown,
  Activity,
  AlertTriangle,
  Zap,
  CheckCircle2,
  GitBranch,
  Repeat,
  Compass,
  Workflow,
  Maximize2,
  RotateCcw,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module3ImportantCNNArchitectures: React.FC = () => {
  // ── Interactive Demo 1: Architecture Comparison Tab State ──
  const [selectedArch, setSelectedArch] = useState<'lenet' | 'alexnet' | 'vgg' | 'resnet' | 'mobilenet'>('resnet');

  // ── Interactive Demo 2: Residual Block & Gradient Flow Simulator State ──
  const [inputValX, setInputValX] = useState<number>(2.5);
  const [residualPerturbation, setResidualPerturbation] = useState<number>(0.2); // F(x)
  const [dFdx, setDFdx] = useState<number>(0.05); // local gradient dF/dx

  const resOutputY = inputValX + residualPerturbation; // y = F(x) + x
  const resGradient = dFdx + 1.0; // dy/dx = dF/dx + 1

  // ── Interactive Demo 3: MobileNet Depthwise-Separable & Multiplier State ──
  const [kernelK, setKernelK] = useState<number>(3);
  const [cinMobile, setCinMobile] = useState<number>(64);
  const [coutMobile, setCoutMobile] = useState<number>(128);
  const [alphaMobile, setAlphaMobile] = useState<number>(0.5);
  const [rhoMobile, setRhoMobile] = useState<number>(0.5);
  const [resMobile, setResMobile] = useState<number>(224);

  // Standard conv weights
  const standardConvWeights = kernelK * kernelK * cinMobile * coutMobile;
  // Depthwise-separable conv weights
  const depthwiseWeights = kernelK * kernelK * cinMobile;
  const pointwiseWeights = cinMobile * coutMobile;
  const depthwiseSepWeights = depthwiseWeights + pointwiseWeights;
  const standardSavingsPercent = ((1 - depthwiseSepWeights / standardConvWeights) * 100).toFixed(1);

  // With MobileNet multipliers
  const scaledCin = Math.max(1, Math.round(alphaMobile * cinMobile));
  const scaledCout = Math.max(1, Math.round(alphaMobile * coutMobile));
  const scaledRes = Math.max(1, Math.round(rhoMobile * resMobile));

  const scaledDwWeights = kernelK * kernelK * scaledCin;
  const scaledPwWeights = scaledCin * scaledCout;
  const scaledTotalWeights = scaledDwWeights + scaledPwWeights;
  const scaledMacs = scaledRes * scaledRes * (scaledDwWeights + scaledPwWeights);

  return (
    <div className="space-y-8 animate-fade-in text-slate-200">
      {/* ── Executive Overview & Goal ─────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>CNN Architectures and Design Patterns</span>
          </h3>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            From LeNet to MobileNet
          </span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          Understanding basic convolution is only the starting point. The central question of deep learning engineering is: <strong>How do we connect and configure convolutional blocks to make networks deeper, more expressive, easier to optimize, and computationally efficient enough for edge devices?</strong>
        </p>
        <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-xs text-cyan-200 leading-relaxed flex items-start gap-3">
          <Workflow className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <strong>Core Trajectory:</strong> Journey from <strong>LeNet-5</strong> (the digit recognition pioneer) to <strong>AlexNet</strong> (ReLU, Dropout, GPUs), <strong>VGG</strong> (stacked 3×3 convolutions), <strong>ResNet</strong> (residual skip connections and gradient highways), <strong>Fully Convolutional Networks (FCN)</strong> for pixel-level semantic segmentation, and <strong>MobileNet</strong> (depthwise-separable convolutions and width/resolution multipliers).
          </div>
        </div>
      </div>

      {/* ── Architecture Evolution Matrix ─────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-slate-100">Evolutionary Milestones in Computer Vision</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Each breakthrough architecture resolved a fundamental bottleneck in model capacity, gradient trainability, or computational cost:
        </p>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-cyan-400 font-semibold">
                <th className="p-2.5">Architecture</th>
                <th className="p-2.5">Year</th>
                <th className="p-2.5">Key Architectural Innovation</th>
                <th className="p-2.5">Primary Challenge Solved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="p-2.5 font-bold text-slate-200">LeNet-5</td>
                <td className="p-2.5 font-mono text-slate-400">1998</td>
                <td className="p-2.5">Convolution <MathText text="$\to$" /> Subsampling <MathText text="$\to$" /> Dense classifier</td>
                <td className="p-2.5">First end-to-end digit classification pipeline</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-slate-200">AlexNet</td>
                <td className="p-2.5 font-mono text-slate-400">2012</td>
                <td className="p-2.5">ReLU activations, Dropout, Data Augmentation, Multi-GPU</td>
                <td className="p-2.5">Large-scale ImageNet training without vanishing gradients</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-slate-200">VGG-16</td>
                <td className="p-2.5 font-mono text-slate-400">2014</td>
                <td className="p-2.5">Factorizing 5×5 and 7×7 filters into homogeneous stacks of 3×3</td>
                <td className="p-2.5">Deeper non-linear representations with fewer weights</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-slate-200">ResNet-50</td>
                <td className="p-2.5 font-mono text-slate-400">2015</td>
                <td className="p-2.5">Identity skip connections: <MathText text="$y = F(x) + x$" /></td>
                <td className="p-2.5">Vanishing gradients in ultra-deep networks (100+ layers)</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-slate-200">FCN</td>
                <td className="p-2.5 font-mono text-slate-400">2015</td>
                <td className="p-2.5">1×1 convs replacing dense layers + transposed convs</td>
                <td className="p-2.5">Dense, pixel-level semantic segmentation</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-slate-200">MobileNet</td>
                <td className="p-2.5 font-mono text-slate-400">2017</td>
                <td className="p-2.5">Depthwise-separable convs (<MathText text="$\text{DW} + \text{PW}$" />) & <MathText text="$\alpha, \rho$" /> multipliers</td>
                <td className="p-2.5">Real-time mobile & embedded inference latency</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── LeNet-5: The Canonical Blueprint ─────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-slate-100">LeNet-5: The Classical Convolutional Blueprint</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Yann LeCun's LeNet-5 established the canonical structure that defines almost all convolutional models: repeated alternating blocks of convolution and spatial pooling, followed by flattening and dense classification layers.
        </p>

        {/* LeNet Dimensions Progression */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Layer-by-Layer Tensor Evolution for 32 × 32 × 1 Input
          </span>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-2 text-center text-xs">
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <span className="text-slate-400 block font-semibold">Input</span>
              <span className="font-mono text-cyan-300 block">32 × 32 × 1</span>
              <span className="text-[10px] text-slate-500">Grayscale digit</span>
            </div>
            <div className="p-2.5 bg-indigo-950/40 rounded-lg border border-indigo-800/40 space-y-1">
              <span className="text-indigo-300 block font-semibold">C1 (Conv 5×5)</span>
              <span className="font-mono text-indigo-200 block">28 × 28 × 6</span>
              <span className="text-[10px] text-slate-500">6 feature maps</span>
            </div>
            <div className="p-2.5 bg-amber-950/40 rounded-lg border border-amber-800/40 space-y-1">
              <span className="text-amber-300 block font-semibold">S2 (Pool /2)</span>
              <span className="font-mono text-amber-200 block">14 × 14 × 6</span>
              <span className="text-[10px] text-slate-500">Downsampled</span>
            </div>
            <div className="p-2.5 bg-indigo-950/40 rounded-lg border border-indigo-800/40 space-y-1">
              <span className="text-indigo-300 block font-semibold">C3 (Conv 5×5)</span>
              <span className="font-mono text-indigo-200 block">10 × 10 × 16</span>
              <span className="text-[10px] text-slate-500">16 feature maps</span>
            </div>
            <div className="p-2.5 bg-amber-950/40 rounded-lg border border-amber-800/40 space-y-1">
              <span className="text-amber-300 block font-semibold">S4 (Pool /2)</span>
              <span className="font-mono text-amber-200 block">5 × 5 × 16</span>
              <span className="text-[10px] text-slate-500">400 activations</span>
            </div>
            <div className="p-2.5 bg-emerald-950/40 rounded-lg border border-emerald-800/40 space-y-1">
              <span className="text-emerald-300 block font-semibold">Dense Classifier</span>
              <span className="font-mono text-emerald-200 block">120 → 84 → 10</span>
              <span className="text-[10px] text-slate-500">10 digit classes</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
          <div className="flex items-center gap-2 font-bold text-cyan-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Key Architectural Takeaway</span>
          </div>
          <p>
            The number <strong>400</strong> is not the number of input pixels. It represents the flattened vector of learned feature activations: <MathText text="$5 \times 5 \times 16 = 400$" />. Notice how spatial resolution progressively decreases (<MathText text="$32 \to 28 \to 14 \to 10 \to 5$" />) while channel depth increases (<MathText text="$1 \to 6 \to 16$" />). This is the hallmark funnel of computer vision backbones.
          </p>
        </div>
      </div>

      {/* ── AlexNet: Scaling Up with ReLU, Dropout & GPUs ──────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-slate-100">AlexNet: Breakthrough at Scale (2012)</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          AlexNet won the 2012 ImageNet challenge by an unprecedented margin, proving that deep neural networks could generalize to massive datasets when paired with critical algorithmic enablers:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              1. Non-Saturating ReLU Activations
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Replaced sigmoid and tanh with <MathText text="$\text{ReLU}(z) = \max(0, z)$" />. Because the gradient is constant (<MathText text="$1$" />) for positive inputs, networks could be trained 6× faster without saturating or vanishing gradients.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
              2. Dropout Regularization
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              During each training step, randomly zeroed out 50% of activations in the dense layers (<MathText text="$p = 0.5$" />). This prevented complex co-adaptations between neurons and acted as an implicit ensemble.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              3. Data Augmentation
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Generated synthetic training data on-the-fly via random cropping (<MathText text="$256 \times 256 \to 224 \times 224$" />), horizontal reflections, and PCA color jittering, expanding the effective dataset by orders of magnitude.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
              4. Parallel GPU Computation
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Split the network across two NVIDIA GTX 580 (3GB VRAM) GPUs using cross-GPU convolutions, pioneering modern parallel deep learning acceleration.
            </p>
          </div>
        </div>
      </div>

      {/* ── VGG-Net: Factorizing Large Convolutions ────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-slate-100">VGG-Net: Factorization of Convolutions into 3×3 Stacks</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Simonyan & Zisserman (2014) introduced an elegant design heuristic: <strong>discard large kernels (5×5, 7×7, 11×11) in favor of deep stacks of small 3×3 convolutions</strong>.
        </p>

        {/* Why Stacked 3x3 Convolutions Win */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
            The Receptive Field & Parameter Proof
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
              <span className="font-bold text-rose-400 block">Single 5×5 Convolution</span>
              <div>• Receptive field: <MathText text="$5 \times 5$" /></div>
              <div>• Parameters (for 1 channel): <MathText text="$5 \times 5 = 25$" /> weights</div>
              <div>• Non-linearities: Exactly <strong>1 ReLU</strong> activation</div>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400 block">Two Stacked 3×3 Convolutions</span>
              <div>• Receptive field: <MathText text="$1 + (3-1) + (3-1) = 5 \times 5$" /> (Identical!)</div>
              <div>• Parameters (for 1 channel): <MathText text="$2 \times (3 \times 3) = 18$" /> weights (<strong>28% fewer!</strong>)</div>
              <div>• Non-linearities: <strong>2 ReLU</strong> activations (More discriminative!)</div>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-indigo-950/30 border border-indigo-800/40 text-xs text-indigo-300">
            Similarly, <strong>three 3×3 convolutions</strong> cover a <MathText text="$7 \times 7$" /> receptive field with <MathText text="$3 \times (3^2) = 27$" /> weights versus <MathText text="$7^2 = 49$" /> weights—a <strong>45% parameter savings</strong> while providing 3 separate non-linear activation layers.
          </div>
        </div>
      </div>

      {/* ── ResNet: Residual Connections & Gradient Highways ──────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-slate-100">ResNet: Residual Learning & Gradient Highways</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Prior to ResNet (He et al., 2015), stacking more layers caused <strong>the degradation problem</strong>: deeper networks had <em>higher</em> training error than shallow ones, not due to overfitting, but because optimization failed. ResNet introduced <strong>residual skip connections</strong>:
        </p>

        {/* Residual Formulation */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono text-sm text-cyan-300 space-y-2">
          <div>
            <MathText text="$$y = \mathcal{F}(x, \{W_i\}) + x$$" />
          </div>
          <p className="text-xs text-slate-400 font-sans">
            Where <MathText text="$x$" /> is the identity shortcut, <MathText text="$\mathcal{F}(x)$" /> is the residual mapping to be learned, and <MathText text="$y$" /> is the output.
          </p>
        </div>

        {/* ── Interactive Demo 2: Residual Block & Gradient Flow Simulator ── */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              Interactive Residual Highway & Gradient Simulator
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              <MathText text="$\frac{\partial y}{\partial x} = \frac{\partial \mathcal{F}}{\partial x} + 1$" />
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1 bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Input Activation (<MathText text="$x$" />)</span>
                <span className="font-mono text-cyan-300">{inputValX.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.1"
                value={inputValX}
                onChange={(e) => setInputValX(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div className="space-y-1 bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Residual Correction (<MathText text="$\mathcal{F}(x)$" />)</span>
                <span className="font-mono text-amber-300">{residualPerturbation.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.05"
                value={residualPerturbation}
                onChange={(e) => setResidualPerturbation(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            <div className="space-y-1 bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Local Conv Gradient (<MathText text="$\frac{\partial \mathcal{F}}{\partial x}$" />)</span>
                <span className="font-mono text-rose-300">{dFdx.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-0.9"
                max="0.9"
                step="0.05"
                value={dFdx}
                onChange={(e) => setDFdx(parseFloat(e.target.value))}
                className="w-full accent-rose-400 cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <div className="space-y-1">
              <span className="text-slate-400">Forward Pass Sum:</span>
              <div className="font-mono text-base font-bold text-emerald-400">
                <MathText text={`$y = \\mathcal{F}(x) + x = ${residualPerturbation.toFixed(2)} + ${inputValX.toFixed(2)} = ${resOutputY.toFixed(2)}$`} />
              </div>
              <p className="text-[11px] text-slate-500">
                If the identity mapping is optimal, the network easily sets <MathText text="$\mathcal{F}(x) \approx 0$" /> so <MathText text="$y = x$" />.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400">Backward Pass Gradient Highway:</span>
              <div className="font-mono text-base font-bold text-cyan-400">
                <MathText text={`$\\frac{\\partial y}{\\partial x} = \\frac{\\partial \\mathcal{F}}{\\partial x} + 1 = ${dFdx.toFixed(2)} + 1.0 = ${resGradient.toFixed(2)}$`} />
              </div>
              <p className="text-[11px] text-slate-500">
                Notice that even if the conv gradient <MathText text="$\frac{\partial \mathcal{F}}{\partial x}$" /> drops near 0, the total gradient never dies because of the <strong>+1 identity term</strong>!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Fully Convolutional Networks (FCN) ───────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center gap-2">
          <Workflow className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-slate-100">Fully Convolutional Networks (FCN) & Pixel-Level Segmentation</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Standard image classification networks compress the entire input into a single global vector <MathText text="$z$" /> and output one categorical label for the whole image. <strong>Semantic segmentation</strong> requires classifying every individual pixel.
        </p>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
            The Transformation from Classifier to Segmenter
          </span>
          <div className="text-center font-mono text-xs text-indigo-300">
            <MathText text="$$X \in \mathbb{R}^{H \times W \times 3} \xrightarrow{\text{All Convolutions}} \text{Deep Features} \xrightarrow{\text{Upsampling}} Y \in \mathbb{R}^{H \times W \times K}$$" />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Long, Shelhamer, & Darrell (2015) replaced all final fully connected layers with <MathText text="$1 \times 1$" /> convolutions. This preserves 2D spatial coordinates and allows the network to accept images of arbitrary input resolution. Upsampling (transposed convolutions) recovers the full original spatial resolution.
          </p>
        </div>
      </div>

      {/* ── Depthwise-Separable Convolutions & MobileNet ─────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold text-slate-100">Depthwise-Separable Convolutions & MobileNet</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Standard convolution filters space and channels simultaneously: for each of the <MathText text="$C_{\text{out}}$" /> output channels, a <MathText text="$K \times K \times C_{\text{in}}$" /> kernel computes a complete 3D dot product. MobileNet factorizes this into two separate steps:
        </p>

        {/* Step Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              1. Depthwise Convolution (Spatial Filtering Only)
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Applies a single <MathText text="$K \times K$" /> filter to each input channel separately without cross-channel summation. Weights: <MathText text="$K^2 \times C_{\text{in}}$" />.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              2. Pointwise Convolution (Channel Mixing Only)
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Applies a <MathText text="$1 \times 1$" /> convolution across all channels at each pixel to mix and project depth. Weights: <MathText text="$C_{\text{in}} \times C_{\text{out}}$" />.
            </p>
          </div>
        </div>

        {/* Efficiency Ratio Card */}
        <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-center font-mono text-xs text-cyan-300 space-y-2">
          <div>
            <MathText text="$$\text{Efficiency Ratio} = \frac{\text{Cost}_{\text{Depthwise-Separable}}}{\text{Cost}_{\text{Standard}}} = \frac{K^2 C_{\text{in}} + C_{\text{in}}C_{\text{out}}}{K^2 C_{\text{in}}C_{\text{out}}} = \frac{1}{C_{\text{out}}} + \frac{1}{K^2}$$" />
          </div>
          <p className="text-[11px] text-slate-400 font-sans">
            For <MathText text="$K = 3$" /> and <MathText text="$C_{\text{out}} \ge 64$" />, the cost drops to <MathText text="$\approx \frac{1}{9} \approx 11\%$" /> (an <strong>89% reduction</strong> in computation and parameters!).
          </p>
        </div>

        {/* ── Interactive Demo 3: MobileNet Architecture & Multiplier Simulator ── */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Interactive MobileNet Multipliers Calculator
            </span>
            <span className="text-[11px] text-slate-400">
              Width Multiplier (<MathText text="$\alpha$" />) & Resolution Multiplier (<MathText text="$\rho$" />)
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <div className="space-y-1 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400 block"><MathText text="$K$" /> (Kernel)</span>
              <input
                type="number"
                min="1"
                max="7"
                value={kernelK}
                onChange={(e) => setKernelK(parseInt(e.target.value) || 3)}
                className="w-full bg-slate-950 text-slate-100 text-xs px-2 py-1 rounded border border-slate-700"
              />
            </div>
            <div className="space-y-1 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400 block"><MathText text="$C_{\text{in}}$" /></span>
              <input
                type="number"
                min="1"
                value={cinMobile}
                onChange={(e) => setCinMobile(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-950 text-slate-100 text-xs px-2 py-1 rounded border border-slate-700"
              />
            </div>
            <div className="space-y-1 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400 block"><MathText text="$C_{\text{out}}$" /></span>
              <input
                type="number"
                min="1"
                value={coutMobile}
                onChange={(e) => setCoutMobile(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-950 text-slate-100 text-xs px-2 py-1 rounded border border-slate-700"
              />
            </div>
            <div className="space-y-1 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Width <MathText text="$\alpha$" /></span>
              <input
                type="number"
                min="0.05"
                max="1.0"
                step="0.05"
                value={alphaMobile}
                onChange={(e) => setAlphaMobile(parseFloat(e.target.value) || 0.5)}
                className="w-full bg-slate-950 text-slate-100 text-xs px-2 py-1 rounded border border-slate-700"
              />
            </div>
            <div className="space-y-1 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Res <MathText text="$\rho$" /></span>
              <input
                type="number"
                min="0.05"
                max="1.0"
                step="0.05"
                value={rhoMobile}
                onChange={(e) => setRhoMobile(parseFloat(e.target.value) || 0.5)}
                className="w-full bg-slate-950 text-slate-100 text-xs px-2 py-1 rounded border border-slate-700"
              />
            </div>
            <div className="space-y-1 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Resolution</span>
              <input
                type="number"
                min="32"
                max="512"
                value={resMobile}
                onChange={(e) => setResMobile(parseInt(e.target.value) || 224)}
                className="w-full bg-slate-950 text-slate-100 text-xs px-2 py-1 rounded border border-slate-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <div className="space-y-1">
              <span className="text-slate-400">Standard Weights:</span>
              <div className="text-base font-mono font-bold text-rose-400">
                {standardConvWeights.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-500"><MathText text="$K^2 C_{\text{in}} C_{\text{out}}$" /></span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400">Depthwise-Sep Weights:</span>
              <div className="text-base font-mono font-bold text-cyan-400">
                {depthwiseSepWeights.toLocaleString()}
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold">
                {standardSavingsPercent}% fewer weights!
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400">Scaled Channels (<MathText text="$\alpha$" />={alphaMobile}):</span>
              <div className="text-base font-mono font-bold text-amber-400">
                {scaledCin} → {scaledCout}
              </div>
              <span className="text-[10px] text-slate-500">Scaled weights: {scaledTotalWeights.toLocaleString()}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400">Scaled Spatial (<MathText text="$\rho$" />={rhoMobile}):</span>
              <div className="text-base font-mono font-bold text-emerald-400">
                {scaledRes} × {scaledRes}
              </div>
              <span className="text-[10px] text-slate-500">MACs: {(scaledMacs / 1e6).toFixed(2)} M</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
