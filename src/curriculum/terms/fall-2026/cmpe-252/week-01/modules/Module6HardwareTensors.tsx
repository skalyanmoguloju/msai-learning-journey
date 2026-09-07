import React, { useState } from 'react';
import { Cpu, Layers, Book, Calculator } from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module6HardwareTensors: React.FC = () => {
  const [cnnW, setCnnW] = useState<number>(32);
  const [cnnF, setCnnF] = useState<number>(5);
  const [cnnP, setCnnP] = useState<number>(1);
  const [cnnS, setCnnS] = useState<number>(2);

  // Step 6 CNN Calculations
  const cnnStep1 = cnnW - cnnF + 2 * cnnP;
  const cnnStep2 = cnnStep1 / (cnnS || 1);
  const cnnO = Math.max(0, Math.floor(cnnStep2) + 1);

  return (
    <div className="space-y-6">
      {/* Neural & CNN Definitions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
          <h4 className="font-bold text-rose-400 uppercase flex items-center gap-1.5 text-sm">
            <Cpu className="w-4 h-4" /> 1. The Perceptron / Artificial Neuron
          </h4>
          <p className="text-slate-300 leading-relaxed">
            <strong>Definition:</strong> The fundamental building block of neural networks. Receives multiple input signals (<MathText text="$x_i$" />), multiplies each by a weight (<MathText text="$w_i$" />), adds a scalar bias (<MathText text="$b$" />), and evaluates the total sum through an activation function <MathText text="$a = f(\sum w_i x_i + b)$" />.
          </p>
        </div>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
          <h4 className="font-bold text-rose-400 uppercase flex items-center gap-1.5 text-sm">
            <Layers className="w-4 h-4" /> 2. Convolutional Layer (CNN)
          </h4>
          <p className="text-slate-300 leading-relaxed">
            <strong>Definition:</strong> A specialized deep learning layer designed for grid data (like images) that slides small learnable 2D matrices (kernels/filters) across inputs to detect local spatial patterns (edges, textures).
          </p>
        </div>
      </div>

      {/* CNN Spatial Parameters Glossary */}
      <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-3 text-xs">
        <h4 className="font-bold text-rose-400 text-sm flex items-center gap-2 font-mono">
          <Book className="w-4 h-4" /> CNN Spatial Parameter Definitions
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-bold text-sky-300 block">Input Size (<MathText text="$W$" />)</span>
            <p className="text-slate-400 text-[11px]">
              The spatial height/width dimension (in pixels) of the incoming input image or feature matrix.
            </p>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-bold text-emerald-300 block">Filter Size (<MathText text="$F$" />)</span>
            <p className="text-slate-400 text-[11px]">
              The receptive spatial width/height of the convolution kernel matrix (typically 3×3 or 5×5).
            </p>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-bold text-amber-300 block">Padding (<MathText text="$P$" />)</span>
            <p className="text-slate-400 text-[11px]">
              Extra zero-valued border pixels added around the input grid to prevent spatial size degradation at edges.
            </p>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-bold text-purple-300 block">Stride (<MathText text="$S$" />)</span>
            <p className="text-slate-400 text-[11px]">
              The step size (number of pixels) the filter shifts across the input matrix during convolution.
            </p>
          </div>
        </div>
      </div>

      {/* CNN Spatial Dimension Formula Card */}
      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
        <h4 className="font-bold text-white uppercase font-mono text-sm">CNN Output Dimension Formula</h4>
        <div className="font-mono text-base text-indigo-400">
          <MathText text="$$O = \left\lfloor \frac{W - F + 2P}{S} \right\rfloor + 1$$" />
        </div>
        <p className="text-slate-400 text-[11px]">
          Where <MathText text="$O$" /> is the output spatial feature map width/height, and <MathText text="$\lfloor \cdot \rfloor$" /> is the floor function rounding down to the nearest integer.
        </p>
      </div>

      {/* Interactive CNN Sizing Calculator */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-sm text-rose-400 flex items-center gap-2">
            <Calculator className="w-4 h-4" /> Interactive CNN Feature Map Output Calculator
          </h3>
          <span className="text-xs text-slate-400 font-mono">Live Step-by-Step Evaluation</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Input Size (<MathText text="$W$" />):</label>
            <input
              type="number"
              value={cnnW}
              min={1}
              onChange={e => setCnnW(Number(e.target.value) || 1)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 font-mono text-white text-center font-bold"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Filter Size (<MathText text="$F$" />):</label>
            <input
              type="number"
              value={cnnF}
              min={1}
              onChange={e => setCnnF(Number(e.target.value) || 1)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 font-mono text-white text-center font-bold"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Padding (<MathText text="$P$" />):</label>
            <input
              type="number"
              value={cnnP}
              min={0}
              onChange={e => setCnnP(Number(e.target.value) || 0)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 font-mono text-white text-center font-bold"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Stride (<MathText text="$S$" />):</label>
            <input
              type="number"
              value={cnnS}
              min={1}
              onChange={e => setCnnS(Number(e.target.value) || 1)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 font-mono text-white text-center font-bold"
            />
          </div>
        </div>

        {/* Calculation Steps Output Box */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono">
          <div className="space-y-1">
            <div className="text-slate-400">
              Step 1: <MathText text={`$W - F + 2P = ${cnnW} - ${cnnF} + 2(${cnnP}) =$`} /> <span className="text-sky-400 font-bold">{cnnStep1}</span>
            </div>
            <div className="text-slate-400">
              Step 2: Divide by Stride <MathText text={`$S = ${cnnS}$:`} /> <span className="text-amber-400 font-bold">{cnnStep2.toFixed(1)}</span>
            </div>
            <div className="text-slate-400">
              Step 3: Floor <MathText text={`$\\lfloor ${cnnStep2.toFixed(1)} \\rfloor + 1 =$`} /> <span className="text-emerald-400 font-bold">{cnnO}</span>
            </div>
          </div>
          <div className="text-center bg-slate-900 px-6 py-3 rounded-xl border border-slate-800 min-w-[160px]">
            <span className="text-slate-400 text-[10px] block uppercase tracking-wider">Output Dimension</span>
            <div className="text-2xl font-extrabold text-rose-400 mt-0.5">{cnnO} × {cnnO}</div>
          </div>
        </div>

        {/* Visual Feature Grid Preview */}
        <div className="space-y-2">
          <div className="text-xs text-slate-400 font-semibold">Visual Output Feature Grid Matrix:</div>
          <div className="flex flex-wrap gap-1 max-w-xs mx-auto p-2 bg-slate-950 rounded-lg border border-slate-800 justify-center">
            {Array.from({ length: Math.min(cnnO * cnnO, 36) }).map((_, idx) => (
              <div key={idx} className="w-3.5 h-3.5 bg-rose-500/80 rounded-sm" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Module6HardwareTensors;
