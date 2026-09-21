import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Sliders,
  ArrowRight,
  TrendingDown,
  Activity,
  AlertTriangle,
  Zap,
  CheckCircle2,
  Database,
  Eye,
  Workflow,
  ShieldAlert,
  Cpu,
  RotateCcw,
  Maximize2,
  Table as TableIcon
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module2WhyCNNs: React.FC = () => {
  // ── Interactive Demo 1: 2D Convolution Grid Simulator ──
  const [selectedPatchRow, setSelectedPatchRow] = useState<number>(0);
  const [selectedPatchCol, setSelectedPatchCol] = useState<number>(0);
  const [showReLU, setShowReLU] = useState<boolean>(false);

  // 5x5 Input Matrix X (vertical step edge: dark on left two cols, bright on right three cols)
  const inputMatrixX: number[][] = [
    [0, 0, 1, 1, 1],
    [0, 0, 1, 1, 1],
    [0, 0, 1, 1, 1],
    [0, 0, 1, 1, 1],
    [0, 0, 1, 1, 1]
  ];

  // 3x3 Vertical Edge Kernel K
  const kernelK: number[][] = [
    [-1, -1, 1],
    [-1, -1, 1],
    [-1, -1, 1]
  ];

  // Calculate the 3x3 output feature map Z and ReLU(Z)
  const outputFeatureMapZ: number[][] = [];
  const reluFeatureMap: number[][] = [];

  for (let r = 0; r <= 2; r++) {
    const rowZ: number[] = [];
    const rowReLU: number[] = [];
    for (let c = 0; c <= 2; c++) {
      let sum = 0;
      for (let u = 0; u < 3; u++) {
        for (let v = 0; v < 3; v++) {
          sum += kernelK[u][v] * inputMatrixX[r + u][c + v];
        }
      }
      rowZ.push(sum);
      rowReLU.push(Math.max(0, sum));
    }
    outputFeatureMapZ.push(rowZ);
    reluFeatureMap.push(rowReLU);
  }

  // Current patch extracted at (selectedPatchRow, selectedPatchCol)
  const currentPatch: number[][] = [];
  const elementProducts: number[][] = [];
  let currentSum = 0;

  for (let u = 0; u < 3; u++) {
    const pRow: number[] = [];
    const prodRow: number[] = [];
    for (let v = 0; v < 3; v++) {
      const xVal = inputMatrixX[selectedPatchRow + u][selectedPatchCol + v];
      const kVal = kernelK[u][v];
      pRow.push(xVal);
      const prod = kVal * xVal;
      prodRow.push(prod);
      currentSum += prod;
    }
    currentPatch.push(pRow);
    elementProducts.push(prodRow);
  }

  // ── Interactive Demo 2: Spatial Dimensions Arithmetic State ──
  const [dimHin, setDimHin] = useState<number>(224);
  const [dimKernel, setDimKernel] = useState<number>(3);
  const [dimPad, setDimPad] = useState<number>(1);
  const [dimStride, setDimStride] = useState<number>(1);

  const safeStride = Math.max(1, dimStride);
  const dimHout = Math.floor((dimHin + 2 * dimPad - dimKernel) / safeStride) + 1;
  const spatialDownsampleRatio = ((1 - (dimHout * dimHout) / (dimHin * dimHin)) * 100).toFixed(1);

  // ── Interactive Demo 3: Computational Efficiency & FLOPs State ──
  const [effHout, setEffHout] = useState<number>(112);
  const [effWout, setEffWout] = useState<number>(112);
  const [effCin, setEffCin] = useState<number>(64);
  const [effCout, setEffCout] = useState<number>(128);
  const [effKh, setEffKh] = useState<number>(3);
  const [effKw, setEffKw] = useState<number>(3);

  const weightsPerFilter = effKh * effKw * effCin;
  const totalConvWeights = weightsPerFilter * effCout;
  const totalConvBiases = effCout;
  const totalConvParams = totalConvWeights + totalConvBiases;
  const totalConvMACs = effHout * effWout * effCout * weightsPerFilter;
  const totalConvGFLOPs = (totalConvMACs * 2) / 1e9;

  // Fully connected comparison (assuming flattened input of same spatial size)
  const fcInputSize = effHout * effWout * effCin;
  const fcOutputSize = effHout * effWout * effCout;
  const fcParams = fcInputSize * 1000; // Even with just 1000 dense units

  return (
    <div className="space-y-8 animate-fade-in text-slate-200">
      {/* ── Executive Overview & Goal ─────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>Why Convolutional Neural Networks?</span>
          </h3>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            Spatial Priors & Inductive Biases
          </span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          While fully connected multi-layer perceptrons (MLPs) can theoretically represent any function, they fail catastrophically when applied to high-resolution images. Convolutional Neural Networks (CNNs) introduce two game-changing architectural inductive biases: <strong>local connectivity</strong> and <strong>parameter sharing</strong>.
        </p>
        <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-xs text-cyan-200 leading-relaxed flex items-start gap-3">
          <Workflow className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <strong>Core Mission:</strong> Understand why dense layers explode in parameters on images, how local kernels scan inputs via cross-correlation, how feature maps preserve 2D topology, the exact arithmetic of padding and stride, and how pooling and weight tying achieve massive computational efficiency.
          </div>
        </div>
      </div>

      {/* ── The Failure of Fully Connected Networks on Images ────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-slate-100">The Parameter Explosion of Fully Connected Layers</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          A fully connected neuron connects to every single numerical input. For an RGB image of height <MathText text="$H$" />, width <MathText text="$W$" />, and <MathText text="$C$" /> channels, flattening the image produces <MathText text="$H \times W \times C$" /> scalar values. A single dense hidden layer with <MathText text="$N$" /> neurons requires:
        </p>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono text-sm text-rose-300">
          <MathText text="$$\text{Parameters}_{\text{FC}} = (H \times W \times C) \times N + N$$" />
        </div>

        {/* Concrete Parameter Calculation Comparison Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-3">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
              Concrete Example: 224 × 224 RGB Image
            </span>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Input dimensions: <MathText text="$224 \times 224 \times 3 = 150,528$" /> scalar inputs.</li>
              <li>Modest hidden layer size: <MathText text="$N = 1,000$" /> neurons.</li>
              <li>
                Parameters required:{' '}
                <strong className="text-rose-300 font-mono">150,528,000 + 1,000 = 150,529,000</strong> weights!
              </li>
            </ul>
            <p className="text-[11px] text-rose-200/80 leading-relaxed">
              Over <strong>150 Million parameters</strong> in just the first layer! This guarantees severe overfitting, immense memory consumption, and training instability.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
              Severe Structural Limitations of MLPs
            </span>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span>
                  <strong>Destroys 2D Grid Topology:</strong> Flattening pixels into a 1D vector treats pixel <MathText text="$(0, 0)$" /> and <MathText text="$(0, 1)$" /> with the exact same independence as pixel <MathText text="$(0, 0)$" /> and <MathText text="$(223, 223)$" />.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span>
                  <strong>No Translation Equivariance:</strong> If a cat moves from the top-left to the bottom-right of the image, an MLP has to independently re-learn the cat detector weights for the bottom-right pixels.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Local Structure, Receptive Fields & Weight Sharing ───────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-slate-100">The Two Core Principles: Local Connectivity & Weight Sharing</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          CNNs overcome the fully connected bottleneck by encoding two physical axioms of the natural visual world:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
              <Maximize2 className="w-4 h-4" />
              <span>1. Local Connectivity & Receptive Fields</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Nearby pixels exhibit strong statistical correlation. A neuron does not need to look at the whole 224×224 canvas to detect an edge; it only needs a tiny local window—its <strong>receptive field</strong> of size <MathText text="$K_h \times K_w \times C_{\text{in}}$" /> (e.g. 3×3).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
              <RotateCcw className="w-4 h-4" />
              <span>2. Parameter Sharing (Weight Tying)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              An edge or texture detector useful at coordinate <MathText text="$(10, 10)$" /> is equally useful at coordinate <MathText text="$(150, 200)$" />. By sliding the identical filter across the entire image, we gain <strong>translation equivariance</strong> with minimal parameters.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-cyan-400 font-semibold">
                <th className="p-2">Structural Component</th>
                <th className="p-2">Mathematical Shape</th>
                <th className="p-2">Functional Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="p-2 font-bold text-slate-200">Single Filter / Kernel</td>
                <td className="p-2 font-mono text-cyan-300"><MathText text="$K_h \times K_w \times C_{\text{in}}$" /></td>
                <td className="p-2">Scans a local patch across all input channels to detect one specific pattern.</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-slate-200">Single Feature Map</td>
                <td className="p-2 font-mono text-cyan-300"><MathText text="$H_{\text{out}} \times W_{\text{out}}$" /></td>
                <td className="p-2">The complete 2D spatial response matrix produced by convolving one filter across the image.</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-slate-200">Filter Bank (Layer)</td>
                <td className="p-2 font-mono text-cyan-300"><MathText text="$K_h \times K_w \times C_{\text{in}} \times C_{\text{out}}$" /></td>
                <td className="p-2">A bank of <MathText text="$C_{\text{out}}$" /> distinct filters, producing an output tensor of depth <MathText text="$C_{\text{out}}$" />.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Interactive 2D Convolution Step-by-Step Simulator ────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-slate-100">
              The 2D Convolution Operation: Worked Numerical Matrix
            </h3>
          </div>
          <button
            onClick={() => setShowReLU(!showReLU)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
              showReLU
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            {showReLU ? 'Showing: Post-ReLU Output' : 'Apply ReLU(z) = max(0, z)'}
          </button>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Consider a <strong>5×5 grayscale input image <MathText text="$X$" /></strong> with a sharp vertical edge (dark 0s on left, bright 1s on right) and a <strong>3×3 vertical edge-detector kernel <MathText text="$K$" /></strong>:
        </p>

        {/* The Discrete Cross-Correlation Formula */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono text-xs text-indigo-300">
          <MathText text="$$Z_{r, c} = \sum_{u=1}^{K_h} \sum_{v=1}^{K_w} \sum_{d=1}^{C_{\text{in}}} K_{u, v, d} X_{r+u-1, c+v-1, d} + b$$" />
        </div>

        {/* Interactive Matrix Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* 5x5 Input Grid */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Input Image <MathText text="$X$" /> (5×5)
              </span>
              <span className="text-[11px] text-cyan-400">Click 3×3 patch origin:</span>
            </div>

            <div className="grid grid-cols-5 gap-1 max-w-[240px] mx-auto">
              {inputMatrixX.map((row, rIdx) =>
                row.map((val, cIdx) => {
                  const isPatch =
                    rIdx >= selectedPatchRow &&
                    rIdx < selectedPatchRow + 3 &&
                    cIdx >= selectedPatchCol &&
                    cIdx < selectedPatchCol + 3;
                  const isOrigin = rIdx === selectedPatchRow && cIdx === selectedPatchCol;

                  return (
                    <button
                      key={`in-${rIdx}-${cIdx}`}
                      onClick={() => {
                        if (rIdx <= 2 && cIdx <= 2) {
                          setSelectedPatchRow(rIdx);
                          setSelectedPatchCol(cIdx);
                        }
                      }}
                      className={`h-10 rounded text-xs font-mono font-bold flex items-center justify-center transition-all ${
                        isOrigin
                          ? 'ring-2 ring-cyan-400 bg-cyan-950/80 text-cyan-200'
                          : isPatch
                          ? 'bg-indigo-900/60 text-indigo-200 border border-indigo-500/50'
                          : val === 1
                          ? 'bg-slate-800 text-slate-200'
                          : 'bg-slate-900 text-slate-500'
                      }`}
                      title={`Cell (${rIdx}, ${cIdx}) - ${val === 1 ? 'Bright' : 'Dark'}`}
                    >
                      {val}
                    </button>
                  );
                })
              )}
            </div>
            <p className="text-[10px] text-slate-500 text-center">
              Active patch spans rows {selectedPatchRow}..{selectedPatchRow + 2}, cols {selectedPatchCol}..{selectedPatchCol + 2}
            </p>
          </div>

          {/* 3x3 Kernel & Elementwise Dot Product */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Kernel <MathText text="$K$" /> × Local Patch <MathText text="$P$" />
              </span>
              <span className="text-[11px] text-slate-400 font-mono">3×3 Filter</span>
            </div>

            <div className="grid grid-cols-3 gap-1 max-w-[180px] mx-auto">
              {kernelK.map((row, u) =>
                row.map((kVal, v) => (
                  <div
                    key={`k-${u}-${v}`}
                    className={`h-10 rounded text-xs font-mono font-bold flex items-center justify-center ${
                      kVal > 0 ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-700/50' : 'bg-rose-950/60 text-rose-300 border border-rose-700/50'
                    }`}
                  >
                    {kVal > 0 ? `+${kVal}` : kVal}
                  </div>
                ))
              )}
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-xs">
              <span className="text-slate-400 block font-semibold text-[11px]">Elementwise Calculation:</span>
              <div className="font-mono text-[11px] text-cyan-300 overflow-x-auto">
                <MathText
                  text={`$Z_{${selectedPatchRow}, ${selectedPatchCol}} = (${elementProducts
                    .flat()
                    .map((p) => (p >= 0 ? `+${p}` : `${p}`))
                    .join('')}) = ${currentSum}$`}
                />
              </div>
              <div className="text-[11px] text-slate-400">
                {currentSum > 0 && <span className="text-emerald-400 font-bold">Strong Match: Vertical edge detected!</span>}
                {currentSum === 0 && <span className="text-amber-400 font-bold">Zero response: Transition region.</span>}
                {currentSum < 0 && <span className="text-rose-400 font-bold">Negative response: Opposite / uniform patch.</span>}
              </div>
            </div>
          </div>

          {/* 3x3 Output Feature Map Z */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Output Map <MathText text={showReLU ? '$\\text{ReLU}(Z)$' : '$Z$'} /> (3×3)
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Stride 1, Pad 0</span>
            </div>

            <div className="grid grid-cols-3 gap-1 max-w-[180px] mx-auto">
              {(showReLU ? reluFeatureMap : outputFeatureMapZ).map((row, rIdx) =>
                row.map((val, cIdx) => {
                  const isSelected = rIdx === selectedPatchRow && cIdx === selectedPatchCol;
                  return (
                    <button
                      key={`out-${rIdx}-${cIdx}`}
                      onClick={() => {
                        setSelectedPatchRow(rIdx);
                        setSelectedPatchCol(cIdx);
                      }}
                      className={`h-10 rounded text-xs font-mono font-bold flex items-center justify-center transition-all ${
                        isSelected
                          ? 'ring-2 ring-emerald-400 bg-emerald-900 text-white shadow-lg'
                          : val > 0
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                          : val === 0
                          ? 'bg-slate-900 text-slate-400 border border-slate-800'
                          : 'bg-rose-950/60 text-rose-300 border border-rose-800'
                      }`}
                    >
                      {val > 0 ? `+${val}` : val}
                    </button>
                  );
                })
              )}
            </div>

            <p className="text-[10px] text-slate-500 text-center leading-relaxed">
              Click any cell in this 3×3 output map to inspect the exact input window and sum that produced it.
            </p>
          </div>
        </div>
      </div>

      {/* ── Spatial Dimension Arithmetic: Padding & Stride ───────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-slate-100">Spatial Dimension Arithmetic: Padding & Stride</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          When convolving a filter across an image, each step decreases spatial dimensions unless zero-padding is added. The output height and width follow the universal CNN dimension formula:
        </p>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono text-sm text-cyan-300">
          <MathText text="$$H_{\text{out}} = \left\lfloor \frac{H_{\text{in}} + 2P - K_h}{S} \right\rfloor + 1, \quad W_{\text{out}} = \left\lfloor \frac{W_{\text{in}} + 2P - K_w}{S} \right\rfloor + 1$$" />
        </div>

        {/* ── Interactive Demo 2: Dimension Calculator ── */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Interactive Output Spatial Size Calculator
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setDimHin(224);
                  setDimKernel(3);
                  setDimPad(1);
                  setDimStride(1);
                }}
                className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-[11px] rounded border border-slate-700 text-cyan-300"
              >
                Same Conv (3×3)
              </button>
              <button
                onClick={() => {
                  setDimHin(5);
                  setDimKernel(3);
                  setDimPad(0);
                  setDimStride(1);
                }}
                className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-[11px] rounded border border-slate-700 text-indigo-300"
              >
                Valid Conv (5→3)
              </button>
              <button
                onClick={() => {
                  setDimHin(224);
                  setDimKernel(7);
                  setDimPad(3);
                  setDimStride(2);
                }}
                className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-[11px] rounded border border-slate-700 text-amber-300"
              >
                ResNet Conv1 (7×7, S=2)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="space-y-1 bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Input Size (<MathText text="$H_{\text{in}}$" />)</span>
                <span className="font-mono text-cyan-300">{dimHin}</span>
              </div>
              <input
                type="number"
                min="1"
                max="1024"
                value={dimHin}
                onChange={(e) => setDimHin(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-950 text-slate-100 text-xs px-2 py-1.5 rounded border border-slate-700"
              />
            </div>

            <div className="space-y-1 bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Kernel Size (<MathText text="$K$" />)</span>
                <span className="font-mono text-cyan-300">{dimKernel}</span>
              </div>
              <input
                type="number"
                min="1"
                max="31"
                value={dimKernel}
                onChange={(e) => setDimKernel(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-950 text-slate-100 text-xs px-2 py-1.5 rounded border border-slate-700"
              />
            </div>

            <div className="space-y-1 bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Padding (<MathText text="$P$" />)</span>
                <span className="font-mono text-cyan-300">{dimPad}</span>
              </div>
              <input
                type="number"
                min="0"
                max="16"
                value={dimPad}
                onChange={(e) => setDimPad(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-950 text-slate-100 text-xs px-2 py-1.5 rounded border border-slate-700"
              />
            </div>

            <div className="space-y-1 bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Stride (<MathText text="$S$" />)</span>
                <span className="font-mono text-cyan-300">{dimStride}</span>
              </div>
              <input
                type="number"
                min="1"
                max="8"
                value={dimStride}
                onChange={(e) => setDimStride(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-950 text-slate-100 text-xs px-2 py-1.5 rounded border border-slate-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 items-center">
            <div className="space-y-1 text-xs">
              <span className="text-slate-400">Dimension Arithmetic Substitution:</span>
              <div className="font-mono text-slate-200 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <MathText
                  text={`$H_{\\text{out}} = \\left\\lfloor \\frac{${dimHin} + 2(${dimPad}) - ${dimKernel}}{${safeStride}} \\right\\rfloor + 1 = ${dimHout}$`}
                />
              </div>
            </div>

            <div className="space-y-1 text-center md:text-right">
              <span className="text-xs text-slate-400">Output Spatial Resolution:</span>
              <div className="text-2xl font-mono font-bold text-emerald-400">
                {dimHout} × {dimHout}
              </div>
              <span className="text-[11px] text-slate-400 block">
                Spatial area reduction:{' '}
                <strong className={parseFloat(spatialDownsampleRatio) > 0 ? 'text-amber-400' : 'text-slate-200'}>
                  {spatialDownsampleRatio}%
                </strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Computational Efficiency: Parameters & FLOPs Calculator ─────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-slate-100">Why CNNs Are Efficient: Parameter & FLOPs Arithmetic</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Because filter weights are shared across all spatial locations, the total parameter count of a convolutional layer depends <strong>only on kernel size and channel depth</strong>, remaining completely independent of image resolution!
        </p>

        {/* Formulas Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center font-mono text-xs">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[11px] text-slate-400 font-sans block">Weights per Filter</span>
            <div className="text-cyan-300"><MathText text="$K_h \times K_w \times C_{\text{in}}$" /></div>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[11px] text-slate-400 font-sans block">Total Layer Parameters</span>
            <div className="text-indigo-300"><MathText text="$(K_h K_w C_{\text{in}} + 1) \times C_{\text{out}}$" /></div>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[11px] text-slate-400 font-sans block">Multiply-Accumulates (MACs)</span>
            <div className="text-emerald-300"><MathText text="$H_{\text{out}} W_{\text{out}} C_{\text{out}} (K_h K_w C_{\text{in}})$" /></div>
          </div>
        </div>

        {/* ── Interactive Demo 3: FLOPs & Parameter Sizer ── */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              Layer Complexity Sizer (Parameters vs. FLOPs)
            </span>
            <span className="text-[11px] text-slate-400">
              Work per output value = <MathText text="$K_h K_w C_{\text{in}}$" /> operations
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <div className="space-y-1 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400 block"><MathText text="$H_{\text{out}}$" /></span>
              <input
                type="number"
                min="1"
                value={effHout}
                onChange={(e) => setEffHout(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-950 text-slate-100 text-xs px-2 py-1 rounded border border-slate-700"
              />
            </div>
            <div className="space-y-1 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400 block"><MathText text="$W_{\text{out}}$" /></span>
              <input
                type="number"
                min="1"
                value={effWout}
                onChange={(e) => setEffWout(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-950 text-slate-100 text-xs px-2 py-1 rounded border border-slate-700"
              />
            </div>
            <div className="space-y-1 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400 block"><MathText text="$C_{\text{in}}$" /></span>
              <input
                type="number"
                min="1"
                value={effCin}
                onChange={(e) => setEffCin(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-950 text-slate-100 text-xs px-2 py-1 rounded border border-slate-700"
              />
            </div>
            <div className="space-y-1 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400 block"><MathText text="$C_{\text{out}}$" /></span>
              <input
                type="number"
                min="1"
                value={effCout}
                onChange={(e) => setEffCout(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-950 text-slate-100 text-xs px-2 py-1 rounded border border-slate-700"
              />
            </div>
            <div className="space-y-1 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400 block"><MathText text="$K_h$" /></span>
              <input
                type="number"
                min="1"
                value={effKh}
                onChange={(e) => setEffKh(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-950 text-slate-100 text-xs px-2 py-1 rounded border border-slate-700"
              />
            </div>
            <div className="space-y-1 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400 block"><MathText text="$K_w$" /></span>
              <input
                type="number"
                min="1"
                value={effKw}
                onChange={(e) => setEffKw(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-950 text-slate-100 text-xs px-2 py-1 rounded border border-slate-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <div className="space-y-1">
              <span className="text-slate-400">Weights per Filter</span>
              <div className="text-base font-mono font-bold text-cyan-400">
                {weightsPerFilter.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-500"><MathText text="$K_h \times K_w \times C_{\text{in}}$" /></span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400">Total Conv Parameters</span>
              <div className="text-base font-mono font-bold text-indigo-300">
                {totalConvParams.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-500">Includes {totalConvBiases} biases</span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400">Multiply-Accumulates (MACs)</span>
              <div className="text-base font-mono font-bold text-emerald-400">
                {(totalConvMACs / 1e6).toFixed(2)} M
              </div>
              <span className="text-[10px] text-slate-500">{totalConvGFLOPs.toFixed(3)} GFLOPs</span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400">FC Parameter Equivalent</span>
              <div className="text-base font-mono font-bold text-rose-400">
                {(fcParams / 1e6).toFixed(0)} M
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold">
                Conv is ~{((1 - totalConvParams / fcParams) * 100).toFixed(2)}% smaller!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Spatial Pooling & The Canonical CNN Pipeline ─────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Workflow className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-slate-100">Spatial Pooling & The Full CNN Architecture</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Downsampling is achieved via <strong>pooling</strong> layers (such as 2×2 Max Pooling with stride 2). Pooling summarizes local activations without adding any trainable weights:
        </p>

        {/* Pooling Dimension Change Card */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left space-y-1">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Standard 2×2 Pooling Transformation</span>
            <div className="text-base font-mono text-cyan-300">
              <MathText text="$$(H \times W \times C) \xrightarrow{2 \times 2 \text{ Pool, } S=2} \left(\frac{H}{2} \times \frac{W}{2} \times C\right)$$" />
            </div>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 space-y-1">
            <div>• Spatial area decreases by <strong className="text-amber-400">4× (75% reduction)</strong>.</div>
            <div>• Channel depth <MathText text="$C$" /> remains completely unchanged.</div>
            <div>• Confers local translation tolerance.</div>
          </div>
        </div>

        {/* The Repeating CNN Pipeline Block */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            The Canonical Deep Convolutional Pipeline
          </span>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-2 items-center text-center text-xs">
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
              <span className="text-slate-400 block font-semibold">Input</span>
              <span className="font-mono text-cyan-300 block"><MathText text="$x$" /></span>
              <span className="text-[10px] text-slate-500">Image Tensor</span>
            </div>
            <div className="flex justify-center text-cyan-400 font-bold">→</div>
            <div className="p-3 bg-indigo-950/40 border border-indigo-800/40 rounded-xl space-y-1">
              <span className="text-indigo-300 block font-semibold">Convolution</span>
              <span className="font-mono text-indigo-200 block"><MathText text="$W \ast x + b$" /></span>
              <span className="text-[10px] text-slate-400">Local Detectors</span>
            </div>
            <div className="flex justify-center text-cyan-400 font-bold">→</div>
            <div className="p-3 bg-amber-950/40 border border-amber-800/40 rounded-xl space-y-1">
              <span className="text-amber-300 block font-semibold">ReLU</span>
              <span className="font-mono text-amber-200 block"><MathText text="$\max(0, z)$" /></span>
              <span className="text-[10px] text-slate-400">Nonlinearity</span>
            </div>
            <div className="flex justify-center text-cyan-400 font-bold">→</div>
            <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl space-y-1">
              <span className="text-emerald-300 block font-semibold">Max Pool</span>
              <span className="font-mono text-emerald-200 block"><MathText text="$2 \times 2, S=2$" /></span>
              <span className="text-[10px] text-slate-400">Downsample</span>
            </div>
          </div>
        </div>

        {/* Global End-to-End Functional Model */}
        <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-indigo-200 space-y-2">
          <span className="font-bold text-indigo-300 uppercase tracking-wider block">
            End-to-End CNN Formulation
          </span>
          <div className="font-mono text-sm text-cyan-300 text-center py-1">
            <MathText text="$$z = f_{\theta}(x) \quad \implies \quad \hat{y} = g_{\phi}(z) = g_{\phi}\left(f_{\theta}(x)\right)$$" />
          </div>
          <p className="leading-relaxed">
            The convolutional and pooling stack forms a parameterized spatial feature extractor <MathText text="$f_{\theta}(x)$" /> that outputs a dense embedding vector <MathText text="$z$" />. A shallow classification head <MathText text="$g_{\phi}(z)$" /> (e.g. Softmax layer) then produces the final class distribution <MathText text="$\hat{y}$" />.
          </p>
        </div>
      </div>
    </div>
  );
};
