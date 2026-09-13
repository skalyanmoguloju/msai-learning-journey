import React, { useState, useMemo } from 'react';
import {
  Boxes,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Activity,
  Compass,
  Layers,
  Minimize2,
  Split,
  Cpu,
  RotateCcw,
  AlertTriangle,
  Check,
  Percent
} from 'lucide-react';
import { MathText } from '../../../../../common';

interface ModuleProps {
  onGoToQuiz?: () => void;
  onOpenFlashcards?: () => void;
}

export const Module1LinearAlgebra: React.FC<ModuleProps> = ({ onGoToQuiz, onOpenFlashcards }) => {
  // --- Matrix Multiplication State ---
  const [m11, setM11] = useState<number>(2);
  const [m12, setM12] = useState<number>(1);
  const [m21, setM21] = useState<number>(1);
  const [m22, setM22] = useState<number>(3);
  const [vx1, setVx1] = useState<number>(4);
  const [vx2, setVx2] = useState<number>(2);

  const matResult = useMemo(() => {
    const row1 = m11 * vx1 + m12 * vx2;
    const row2 = m21 * vx1 + m22 * vx2;
    return { row1, row2 };
  }, [m11, m12, m21, m22, vx1, vx2]);

  // --- Dot Product State ---
  const [dotA1, setDotA1] = useState<number>(3);
  const [dotA2, setDotA2] = useState<number>(1);
  const [dotB1, setDotB1] = useState<number>(1);
  const [dotB2, setDotB2] = useState<number>(2);

  const dotStats = useMemo(() => {
    const dot = dotA1 * dotB1 + dotA2 * dotB2;
    const normA = Math.sqrt(dotA1 * dotA1 + dotA2 * dotA2);
    const normB = Math.sqrt(dotB1 * dotB1 + dotB2 * dotB2);
    const denom = normA * normB;
    const cosAngle = denom > 0.00001 ? Math.max(-1, Math.min(1, dot / denom)) : 0;
    const deg = (Math.acos(cosAngle) * 180) / Math.PI;

    let meaning = 'Orthogonal / Perpendicular (90°)';
    let badgeColor = 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    if (dot > 0.00001) {
      meaning = 'Generally similar direction (acute angle < 90°)';
      badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    } else if (dot < -0.00001) {
      meaning = 'Generally opposite direction (obtuse angle > 90°)';
      badgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/30';
    }

    return { dot, normA, normB, cosAngle, deg, meaning, badgeColor };
  }, [dotA1, dotA2, dotB1, dotB2]);

  // --- Projection State & Visualizer ---
  const [projA1, setProjA1] = useState<number>(3);
  const [projA2, setProjA2] = useState<number>(1);
  const [projB1, setProjB1] = useState<number>(1);
  const [projB2, setProjB2] = useState<number>(2);

  const projStats = useMemo(() => {
    const dotAB = projA1 * projB1 + projA2 * projB2;
    const dotBB = projB1 * projB1 + projB2 * projB2;
    const isZeroB = dotBB < 0.00001;
    const coeff = isZeroB ? 0 : dotAB / dotBB;
    const p1 = coeff * projB1;
    const p2 = coeff * projB2;
    const perp1 = projA1 - p1;
    const perp2 = projA2 - p2;

    return { dotAB, dotBB, isZeroB, coeff, p1, p2, perp1, perp2 };
  }, [projA1, projA2, projB1, projB2]);

  // --- Gram-Schmidt State ---
  const [g11, setG11] = useState<number>(3);
  const [g12, setG12] = useState<number>(1);
  const [g21, setG21] = useState<number>(1);
  const [g22, setG22] = useState<number>(2);

  const gramStats = useMemo(() => {
    const normV1 = Math.sqrt(g11 * g11 + g12 * g12);
    if (normV1 < 0.00001) {
      return { error: 'Vector v₁ cannot be the zero vector.' };
    }
    const q1x = g11 / normV1;
    const q1y = g12 / normV1;

    // proj of v2 on q1 = (v2 · q1) * q1
    const dotV2Q1 = g21 * q1x + g22 * q1y;
    const projX = dotV2Q1 * q1x;
    const projY = dotV2Q1 * q1y;

    const u2x = g21 - projX;
    const u2y = g22 - projY;
    const normU2 = Math.sqrt(u2x * u2x + u2y * u2y);

    if (normU2 < 0.00001) {
      return {
        normV1,
        q1x,
        q1y,
        projX,
        projY,
        u2x,
        u2y,
        normU2,
        error: 'Vectors are linearly dependent (point in identical direction); cannot construct second orthogonal vector q₂.'
      };
    }

    const q2x = u2x / normU2;
    const q2y = u2y / normU2;
    const checkDot = q1x * q2x + q1y * q2y;

    return {
      normV1,
      q1x,
      q1y,
      dotV2Q1,
      projX,
      projY,
      u2x,
      u2y,
      normU2,
      q2x,
      q2y,
      checkDot
    };
  }, [g11, g12, g21, g22]);

  // --- LU Decomposition State ---
  const [l11, setL11] = useState<number>(4);
  const [l12, setL12] = useState<number>(3);
  const [l21, setL21] = useState<number>(2);
  const [l22, setL22] = useState<number>(5);
  const [lr1, setLr1] = useState<number>(10);
  const [lr2, setLr2] = useState<number>(14);

  const luStats = useMemo(() => {
    if (Math.abs(l11) < 0.00001) {
      return { error: 'First pivot entry A₁₁ cannot be zero for this simple LU scheme (pivot permutation required).' };
    }
    const lMultiplier = l21 / l11;
    const u11 = l11;
    const u12 = l12;
    const u22 = l22 - lMultiplier * l12;

    if (Math.abs(u22) < 0.00001) {
      return { error: 'Matrix is singular (det = 0) or has zero second pivot.' };
    }

    // Forward substitution: Ly = r
    // [1 0; l 1] [y1; y2] = [r1; r2]
    const y1 = lr1;
    const y2 = lr2 - lMultiplier * y1;

    // Back substitution: Ux = y
    // [u11 u12; 0 u22] [x1; x2] = [y1; y2]
    const x2 = y2 / u22;
    const x1 = (y1 - u12 * x2) / u11;

    const checkR1 = l11 * x1 + l12 * x2;
    const checkR2 = l21 * x1 + l22 * x2;

    return {
      lMultiplier,
      u11,
      u12,
      u22,
      y1,
      y2,
      x1,
      x2,
      checkR1,
      checkR2
    };
  }, [l11, l12, l21, l22, lr1, lr2]);

  // --- SVD State ---
  const [s11, setS11] = useState<number>(3);
  const [s12, setS12] = useState<number>(1);
  const [s21, setS21] = useState<number>(0);
  const [s22, setS22] = useState<number>(2);
  const [rankK, setRankK] = useState<number>(1);

  const svdStats = useMemo(() => {
    // A^T A = [s11 s21; s12 s22] * [s11 s12; s21 s22]
    const ata11 = s11 * s11 + s21 * s21;
    const ata12 = s11 * s12 + s21 * s22;
    const ata22 = s12 * s12 + s22 * s22;

    const trace = ata11 + ata22;
    const det = ata11 * ata22 - ata12 * ata12;
    const disc = Math.sqrt(Math.max(0, trace * trace - 4 * det));

    const lambda1 = Math.max(0, (trace + disc) / 2);
    const lambda2 = Math.max(0, (trace - disc) / 2);

    const sigma1 = Math.sqrt(lambda1);
    const sigma2 = Math.sqrt(lambda2);

    const totalEnergy = sigma1 * sigma1 + sigma2 * sigma2;
    const keptEnergy = rankK === 1 ? sigma1 * sigma1 : totalEnergy;
    const energyPct = totalEnergy > 0.00001 ? (keptEnergy / totalEnergy) * 100 : 0;

    const estimatedRank = sigma2 > 0.0001 ? 2 : sigma1 > 0.0001 ? 1 : 0;

    return {
      ata11,
      ata12,
      ata22,
      trace,
      det,
      sigma1,
      sigma2,
      totalEnergy,
      keptEnergy,
      energyPct,
      estimatedRank
    };
  }, [s11, s12, s21, s22, rankK]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Module Overview Banner */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-sm">
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Linear algebra forms the computational backbone of modern Artificial Intelligence and Machine Learning.
          Models represent datasets as high-dimensional vectors, transform features through matrix multiplications,
          solve systems <MathText text="$\mathbf{A}\mathbf{x} = \mathbf{b}$" /> via LU decomposition, and compress parameters or uncover latent semantic topics using Singular Value Decomposition (SVD).
        </p>

        <div className="p-3.5 bg-blue-950/40 border border-blue-800/40 rounded-xl text-xs text-blue-200 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white font-semibold">How to use this guide:</strong> Explore each section below, adjust the matrix and vector inputs to observe the resulting algebraic and geometric transformations in real time, and test your understanding with the concept checks.
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. VECTORS & MATRICES */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Boxes className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white">Vectors and Matrices</h4>
          </div>
          <span className="text-xs text-slate-400">Foundation of Data Representation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Vector Card */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Vector</span>
              <span className="text-[11px] text-slate-500 font-mono">1D Array</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              An ordered list of numbers. Geometrically, it specifies a directed arrow with magnitude and orientation from the origin; algebraically, it represents a single data record or feature coordinate.
            </p>
            <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 font-mono text-xs text-slate-200">
              <div className="text-[11px] text-slate-400 mb-1">2D Column Vector:</div>
              <MathText text="$\mathbf{x} = \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} = [x_1, x_2]^T \in \mathbb{R}^2$" />
            </div>
          </div>

          {/* Matrix Card */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Matrix</span>
              <span className="text-[11px] text-slate-500 font-mono">2D Tensor</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              A rectangular array of numbers arranged into rows and columns. It functions as a dataset container or a linear transformation operator that maps input vectors to output coordinates.
            </p>
            <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 font-mono text-xs text-slate-200">
              <div className="text-[11px] text-slate-400 mb-1">2 × 2 Transformation Matrix:</div>
              <MathText text="$\mathbf{A} = \begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{bmatrix} \in \mathbb{R}^{2 \times 2}$" />
            </div>
          </div>
        </div>

        {/* Interactive Matrix-Vector Multiplication */}
        <div className="p-4 bg-slate-950/90 border border-slate-800 rounded-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Boxes className="w-4 h-4 text-blue-400" />
              Interactive Matrix-Vector Multiplication: <MathText text="$\mathbf{A}\mathbf{x}$" />
            </h5>
            <button
              onClick={() => {
                setM11(2); setM12(1); setM21(1); setM22(3);
                setVx1(4); setVx2(2);
              }}
              className="px-2 py-1 rounded bg-slate-800 text-[11px] text-slate-300 hover:bg-slate-700 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          <p className="text-xs text-slate-300">
            Each row of matrix <MathText text="$\mathbf{A}$" /> forms a dot product with the input column vector <MathText text="$\mathbf{x}$" />:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Matrix A Inputs */}
            <div className="md:col-span-5 p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-indigo-300 block">Matrix A (2×2):</span>
              <div className="grid grid-cols-2 gap-2 max-w-[180px] mx-auto">
                <input
                  type="number"
                  value={m11}
                  onChange={e => setM11(Number(e.target.value))}
                  className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700 focus:border-indigo-500 focus:outline-none"
                  title="a11"
                />
                <input
                  type="number"
                  value={m12}
                  onChange={e => setM12(Number(e.target.value))}
                  className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700 focus:border-indigo-500 focus:outline-none"
                  title="a12"
                />
                <input
                  type="number"
                  value={m21}
                  onChange={e => setM21(Number(e.target.value))}
                  className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700 focus:border-indigo-500 focus:outline-none"
                  title="a21"
                />
                <input
                  type="number"
                  value={m22}
                  onChange={e => setM22(Number(e.target.value))}
                  className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700 focus:border-indigo-500 focus:outline-none"
                  title="a22"
                />
              </div>
            </div>

            {/* Multiply Operator */}
            <div className="md:col-span-1 text-center font-bold text-slate-500 text-lg">
              ×
            </div>

            {/* Vector x Inputs */}
            <div className="md:col-span-3 p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-blue-300 block">Vector x (2×1):</span>
              <div className="grid grid-cols-1 gap-2 max-w-[90px] mx-auto">
                <input
                  type="number"
                  value={vx1}
                  onChange={e => setVx1(Number(e.target.value))}
                  className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                  title="x1"
                />
                <input
                  type="number"
                  value={vx2}
                  onChange={e => setVx2(Number(e.target.value))}
                  className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                  title="x2"
                />
              </div>
            </div>

            {/* Result Ax */}
            <div className="md:col-span-3 p-3 bg-slate-900/90 rounded-xl border border-emerald-900/40 space-y-2">
              <span className="text-xs font-bold text-emerald-400 block">Result Vector Ax:</span>
              <div className="p-2 bg-slate-950 rounded-lg border border-emerald-500/20 text-center font-mono text-sm space-y-1">
                <div className="text-xs text-slate-400">
                  Row 1: {m11}({vx1}) + {m12}({vx2}) = <strong className="text-emerald-300">{matResult.row1}</strong>
                </div>
                <div className="text-xs text-slate-400">
                  Row 2: {m21}({vx1}) + {m22}({vx2}) = <strong className="text-emerald-300">{matResult.row2}</strong>
                </div>
                <div className="pt-1 border-t border-slate-800 text-emerald-400 font-bold text-base">
                  [{matResult.row1}, {matResult.row2}]ᵀ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DOT PRODUCT */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Compass className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white">The Dot Product</h4>
          </div>
          <span className="text-xs text-slate-400">Inner Product &amp; Directional Similarity</span>
        </div>

        <div className="space-y-3">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The dot product (inner product) multiplies matching coordinates across two vectors of identical length and sums the products. Geometrically, it measures the degree of directional alignment between the vectors.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-blue-400 font-bold block">General n-Dimensional Sum:</span>
              <MathText text="$\mathbf{a} \cdot \mathbf{b} = \sum_{i=1}^n a_i b_i = a_1 b_1 + a_2 b_2 + \dots + a_n b_n$" />
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-indigo-400 font-bold block">Geometric Angle Formula:</span>
              <MathText text="$\mathbf{a} \cdot \mathbf{b} = \|\mathbf{a}\| \|\mathbf{b}\| \cos(\theta) \implies \cos(\theta) = \frac{\mathbf{a} \cdot \mathbf{b}}{\|\mathbf{a}\| \|\mathbf{b}\|}$" />
            </div>
          </div>
        </div>

        {/* Interactive Dot Product Calculator */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-4 h-4 text-blue-400" />
            Interactive Vector Alignment &amp; Angle Lab
          </h5>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3 p-3.5 bg-slate-900 rounded-xl border border-slate-800">
              <div>
                <label className="text-xs font-bold text-blue-400 block mb-1">
                  Vector a: [a₁, a₂]
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={dotA1}
                    onChange={e => setDotA1(Number(e.target.value))}
                    className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                  />
                  <input
                    type="number"
                    value={dotA2}
                    onChange={e => setDotA2(Number(e.target.value))}
                    className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-amber-400 block mb-1">
                  Vector b: [b₁, b₂]
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={dotB1}
                    onChange={e => setDotB1(Number(e.target.value))}
                    className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700 focus:border-amber-500 focus:outline-none"
                  />
                  <input
                    type="number"
                    value={dotB2}
                    onChange={e => setDotB2(Number(e.target.value))}
                    className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  onClick={() => { setDotA1(3); setDotA2(1); setDotB1(1); setDotB2(2); }}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px]"
                >
                  Default
                </button>
                <button
                  onClick={() => { setDotA1(2); setDotA2(1); setDotB1(1); setDotB2(-2); }}
                  className="px-2 py-1 bg-purple-900/40 hover:bg-purple-800/60 text-purple-200 rounded text-[10px]"
                >
                  Perpendicular (Dot = 0)
                </button>
                <button
                  onClick={() => { setDotA1(2); setDotA2(3); setDotB1(-2); setDotB2(-3); }}
                  className="px-2 py-1 bg-rose-900/40 hover:bg-rose-800/60 text-rose-200 rounded text-[10px]"
                >
                  Opposite (Dot &lt; 0)
                </button>
              </div>
            </div>

            {/* Results & Geometric Meaning */}
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-2.5 font-mono text-xs">
              <div className="text-slate-400">
                <MathText text={`$\\mathbf{a} \\cdot \\mathbf{b} = (${dotA1})(${dotB1}) + (${dotA2})(${dotB2}) = $`} />
                <span className="text-base font-bold text-white ml-1">{dotStats.dot.toFixed(4)}</span>
              </div>
              <div className="text-slate-400">
                <MathText text={`$\\|\\mathbf{a}\\| = \\sqrt{${dotA1}^2 + ${dotA2}^2} = ${dotStats.normA.toFixed(4)}$`} />
              </div>
              <div className="text-slate-400">
                <MathText text={`$\\|\\mathbf{b}\\| = \\sqrt{${dotB1}^2 + ${dotB2}^2} = ${dotStats.normB.toFixed(4)}$`} />
              </div>
              <div className="text-slate-400">
                <MathText text={`$\\cos(\\theta) = ${dotStats.cosAngle.toFixed(4)} \\implies \\theta \\approx ${dotStats.deg.toFixed(1)}^\\circ$`} />
              </div>

              <div className={`p-2.5 rounded-lg border text-xs font-sans font-semibold mt-2 ${dotStats.badgeColor}`}>
                {dotStats.meaning}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. VECTOR PROJECTION */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Activity className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white">Vector Projection</h4>
          </div>
          <span className="text-xs text-slate-400">Orthogonal Shadow &amp; Decomposition</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          The orthogonal projection of vector <MathText text="$\mathbf{a}$" /> onto vector <MathText text="$\mathbf{b}$" /> represents the geometric “shadow” cast by <MathText text="$\mathbf{a}$" /> along the line of <MathText text="$\mathbf{b}$" />. The scalar coefficient determines how many units of <MathText text="$\mathbf{b}$" /> are contained in <MathText text="$\mathbf{a}$" />.
        </p>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs">
          <span className="text-emerald-400 font-bold block mb-1">Projection Formula:</span>
          <MathText text="$\text{proj}_{\mathbf{b}}(\mathbf{a}) = \left( \frac{\mathbf{a} \cdot \mathbf{b}}{\mathbf{b} \cdot \mathbf{b}} \right) \mathbf{b} = \left( \frac{\mathbf{a} \cdot \mathbf{b}}{\|\mathbf{b}\|^2} \right) \mathbf{b}$" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Interactive Controls */}
          <div className="lg:col-span-6 space-y-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" /> Adjust Vectors
            </h5>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-blue-400 block mb-1">Vector a (Blue):</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={projA1}
                    onChange={e => setProjA1(Number(e.target.value))}
                    className="w-full p-2 bg-slate-900 text-center font-mono text-sm text-white rounded border border-slate-700"
                  />
                  <input
                    type="number"
                    value={projA2}
                    onChange={e => setProjA2(Number(e.target.value))}
                    className="w-full p-2 bg-slate-900 text-center font-mono text-sm text-white rounded border border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-amber-400 block mb-1">Vector b (Amber):</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={projB1}
                    onChange={e => setProjB1(Number(e.target.value))}
                    className="w-full p-2 bg-slate-900 text-center font-mono text-sm text-white rounded border border-slate-700"
                  />
                  <input
                    type="number"
                    value={projB2}
                    onChange={e => setProjB2(Number(e.target.value))}
                    className="w-full p-2 bg-slate-900 text-center font-mono text-sm text-white rounded border border-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Mathematical Readout */}
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono space-y-1.5 text-slate-300">
              <div><MathText text={`$\\mathbf{a} \\cdot \\mathbf{b} = ${projStats.dotAB.toFixed(2)}$`} /></div>
              <div><MathText text={`$\\mathbf{b} \\cdot \\mathbf{b} = \\|\\mathbf{b}\\|^2 = ${projStats.dotBB.toFixed(2)}$`} /></div>
              <div><MathText text={`$\\text{Coefficient } c = \\frac{\\mathbf{a} \\cdot \\mathbf{b}}{\\mathbf{b} \\cdot \\mathbf{b}} = ${projStats.coeff.toFixed(4)}$`} /></div>
              <div className="pt-1 border-t border-slate-800 text-emerald-400 font-bold">
                <MathText text={`$\\text{proj}_{\\mathbf{b}}(\\mathbf{a}) = [${projStats.p1.toFixed(3)}, ${projStats.p2.toFixed(3)}]^T$`} />
              </div>
              <div className="text-[11px] text-slate-400">
                <MathText text={`$\\mathbf{a}_{\\perp} = \\mathbf{a} - \\text{proj}_{\\mathbf{b}}(\\mathbf{a}) = [${projStats.perp1.toFixed(3)}, ${projStats.perp2.toFixed(3)}]^T$`} />
              </div>
            </div>
          </div>

          {/* SVG Visualizer */}
          <div className="lg:col-span-6 p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 self-start">
              2D Geometric Plane (Origin at Center)
            </span>
            <div className="w-full max-w-[340px] aspect-square bg-slate-900 rounded-xl border border-slate-800 p-2 relative overflow-hidden flex items-center justify-center">
              <svg viewBox="-6 -6 12 12" className="w-full h-full">
                <defs>
                  <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#3b82f6" />
                  </marker>
                  <marker id="arrow-amber" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
                  </marker>
                  <marker id="arrow-emerald" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                  </marker>
                </defs>

                {/* Grid Lines */}
                {[-4, -2, 2, 4].map(v => (
                  <g key={v}>
                    <line x1={v} y1="-5.5" x2={v} y2="5.5" stroke="#1e293b" strokeWidth="0.05" />
                    <line x1="-5.5" y1={v} x2="5.5" y2={v} stroke="#1e293b" strokeWidth="0.05" />
                  </g>
                ))}

                {/* Axes */}
                <line x1="-5.5" y1="0" x2="5.5" y2="0" stroke="#475569" strokeWidth="0.1" />
                <line x1="0" y1="-5.5" x2="0" y2="5.5" stroke="#475569" strokeWidth="0.1" />

                {/* Dashed line of Vector b */}
                {projStats.dotBB > 0.001 && (
                  <line
                    x1={-projB1 * 4}
                    y1={projB2 * 4}
                    x2={projB1 * 4}
                    y2={-projB2 * 4}
                    stroke="#f59e0b"
                    strokeWidth="0.06"
                    strokeDasharray="0.3,0.3"
                    opacity="0.3"
                  />
                )}

                {/* Perpendicular drop line from tip of a to proj */}
                <line
                  x1={projA1}
                  y1={-projA2}
                  x2={projStats.p1}
                  y2={-projStats.p2}
                  stroke="#94a3b8"
                  strokeWidth="0.08"
                  strokeDasharray="0.2,0.2"
                />

                {/* Vector a (Blue) */}
                <line
                  x1="0"
                  y1="0"
                  x2={projA1}
                  y2={-projA2}
                  stroke="#3b82f6"
                  strokeWidth="0.18"
                  markerEnd="url(#arrow-blue)"
                />
                <text x={projA1 + 0.3} y={-projA2 - 0.3} fill="#3b82f6" fontSize="0.9" fontWeight="bold">
                  a
                </text>

                {/* Vector b (Amber) */}
                <line
                  x1="0"
                  y1="0"
                  x2={projB1}
                  y2={-projB2}
                  stroke="#f59e0b"
                  strokeWidth="0.18"
                  markerEnd="url(#arrow-amber)"
                />
                <text x={projB1 + 0.3} y={-projB2 - 0.3} fill="#f59e0b" fontSize="0.9" fontWeight="bold">
                  b
                </text>

                {/* Projection Vector (Emerald) */}
                <line
                  x1="0"
                  y1="0"
                  x2={projStats.p1}
                  y2={-projStats.p2}
                  stroke="#10b981"
                  strokeWidth="0.24"
                  markerEnd="url(#arrow-emerald)"
                />
                <text x={projStats.p1 - 0.2} y={-projStats.p2 + 0.8} fill="#10b981" fontSize="0.75" fontWeight="bold">
                  proj
                </text>
              </svg>
            </div>
            <div className="flex gap-4 text-[10px] text-slate-400 mt-2">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Vector a</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Vector b</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Shadow proj_b(a)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. ORTHOGONALITY */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Split className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white">Orthogonality &amp; Independence</h4>
          </div>
          <span className="text-xs text-slate-400">Zero Redundancy &amp; Perpendicularity</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
              Mathematical Condition
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Two non-zero vectors <MathText text="$\mathbf{a}$" /> and <MathText text="$\mathbf{b}$" /> are orthogonal (<MathText text="$\mathbf{a} \perp \mathbf{b}$" />) if and only if their inner product equals zero:
            </p>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-white">
              <MathText text="$\mathbf{a} \perp \mathbf{b} \iff \mathbf{a} \cdot \mathbf{b} = 0$" />
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Machine Learning Intuition
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Orthogonal vectors carry zero informational overlap (multicollinearity = 0). Decomposing signals, model weights, or image pixels onto an orthogonal coordinate basis eliminates redundant representation.
            </p>
          </div>
        </div>

        {/* Worked Example */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-white block">Concrete 2D Orthogonality Test:</span>
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
            <div><MathText text="$\mathbf{a} = [2, 1]^T, \quad \mathbf{b} = [1, -2]^T$" /></div>
            <div><MathText text="$\mathbf{a} \cdot \mathbf{b} = (2)(1) + (1)(-2) = 2 - 2 = 0$" /></div>
            <div className="text-emerald-400 font-bold pt-1">
              <MathText text="$\implies \mathbf{a} \perp \mathbf{b} \quad (\text{Vectors are exactly perpendicular at } 90^\circ)$" />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. GRAM-SCHMIDT PROCESS */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white">The Gram–Schmidt Process</h4>
          </div>
          <span className="text-xs text-slate-400">Orthonormal Basis Construction</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          The Gram–Schmidt algorithm transforms any set of linearly independent vectors into an orthonormal basis—vectors that are mutually orthogonal (<MathText text="$\mathbf{q}_i \cdot \mathbf{q}_j = 0$" />) and have unit length (<MathText text="$\|\mathbf{q}_i\| = 1$" />).
        </p>

        {/* Step-by-Step Algorithm Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono text-[10px] font-bold">
              Step 1: Normalize v₁
            </span>
            <p className="text-[11px] text-slate-400">Scale the first vector to unit length:</p>
            <div className="font-mono text-xs text-white">
              <MathText text="$\mathbf{q}_1 = \frac{\mathbf{v}_1}{\|\mathbf{v}_1\|}$" />
            </div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono text-[10px] font-bold">
              Step 2: Remove Projection
            </span>
            <p className="text-[11px] text-slate-400">Subtract shadow of v₂ onto q₁:</p>
            <div className="font-mono text-xs text-white">
              <MathText text="$\mathbf{u}_2 = \mathbf{v}_2 - (\mathbf{v}_2 \cdot \mathbf{q}_1)\mathbf{q}_1$" />
            </div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
              Step 3: Normalize u₂
            </span>
            <p className="text-[11px] text-slate-400">Scale remainder to unit length:</p>
            <div className="font-mono text-xs text-white">
              <MathText text="$\mathbf{q}_2 = \frac{\mathbf{u}_2}{\|\mathbf{u}_2\|}$" />
            </div>
          </div>
        </div>

        {/* Interactive Gram-Schmidt Calculator */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" /> Interactive Gram–Schmidt Solver
          </h5>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-300 block">Input Linearly Independent Vectors:</span>
              <div>
                <label className="text-xs font-bold text-blue-400 block mb-1">Vector v₁: [x, y]</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={g11}
                    onChange={e => setG11(Number(e.target.value))}
                    className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
                  />
                  <input
                    type="number"
                    value={g12}
                    onChange={e => setG12(Number(e.target.value))}
                    className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-amber-400 block mb-1">Vector v₂: [x, y]</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={g21}
                    onChange={e => setG21(Number(e.target.value))}
                    className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
                  />
                  <input
                    type="number"
                    value={g22}
                    onChange={e => setG22(Number(e.target.value))}
                    className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Step by Step Breakdown */}
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
              {gramStats.error ? (
                <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-800 text-rose-300 text-xs font-sans">
                  <AlertTriangle className="w-4 h-4 inline-block mr-1 text-rose-400" />
                  {gramStats.error}
                </div>
              ) : (
                <>
                  <div className="text-slate-400">
                    Step 1: <MathText text={`$\\|\\mathbf{v}_1\\| = ${gramStats.normV1?.toFixed(4)}$`} />
                    <div className="text-blue-300 font-bold">
                      <MathText text={`$\\mathbf{q}_1 = [${gramStats.q1x?.toFixed(4)}, ${gramStats.q1y?.toFixed(4)}]^T$`} />
                    </div>
                  </div>

                  <div className="text-slate-400 pt-1 border-t border-slate-800">
                    Step 2: Projection onto q₁
                    <div className="text-slate-300">
                      <MathText text={`$\\text{proj}_{\\mathbf{q}_1}(\\mathbf{v}_2) = [${gramStats.projX?.toFixed(4)}, ${gramStats.projY?.toFixed(4)}]^T$`} />
                    </div>
                    <div className="text-slate-300">
                      <MathText text={`$\\mathbf{u}_2 = \\mathbf{v}_2 - \\text{proj} = [${gramStats.u2x?.toFixed(4)}, ${gramStats.u2y?.toFixed(4)}]^T$`} />
                    </div>
                  </div>

                  <div className="text-slate-400 pt-1 border-t border-slate-800">
                    Step 3: <MathText text={`$\\|\\mathbf{u}_2\\| = ${gramStats.normU2?.toFixed(4)}$`} />
                    <div className="text-emerald-400 font-bold">
                      <MathText text={`$\\mathbf{q}_2 = [${gramStats.q2x?.toFixed(4)}, ${gramStats.q2y?.toFixed(4)}]^T$`} />
                    </div>
                  </div>

                  <div className="pt-1 border-t border-slate-800 text-purple-300 font-bold text-[11px] font-sans flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-purple-400" />
                    Orthogonality Verification: <MathText text={`$\\mathbf{q}_1 \\cdot \\mathbf{q}_2 = ${Math.abs(gramStats.checkDot || 0) < 0.0001 ? '0.0000' : gramStats.checkDot?.toFixed(4)}$`} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. LU DECOMPOSITION */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white">LU Decomposition</h4>
          </div>
          <span className="text-xs text-slate-400">Triangular Factorization &amp; Fast Solving</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          LU factorization decomposes square matrix <MathText text="$\mathbf{A}$" /> into a unit lower-triangular matrix <MathText text="$\mathbf{L}$" /> and an upper-triangular matrix <MathText text="$\mathbf{U}$" /> (<MathText text="$\mathbf{A} = \mathbf{L}\mathbf{U}$" />). To solve <MathText text="$\mathbf{A}\mathbf{x} = \mathbf{r}$" />, we factor once (<MathText text="$\mathcal{O}(n^3)$" />) and then solve two fast triangular systems via forward and back substitution (<MathText text="$\mathcal{O}(n^2)$" />).
        </p>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="text-blue-400 font-bold block mb-1">1. Forward Substitution:</span>
              <MathText text="$\mathbf{L}\mathbf{y} = \mathbf{r} \implies y_1 = r_1, \quad y_2 = r_2 - l_{21} y_1$" />
            </div>
            <div>
              <span className="text-emerald-400 font-bold block mb-1">2. Back Substitution:</span>
              <MathText text="$\mathbf{U}\mathbf{x} = \mathbf{y} \implies x_2 = \frac{y_2}{u_{22}}, \quad x_1 = \frac{y_1 - u_{12} x_2}{u_{11}}$" />
            </div>
          </div>
        </div>

        {/* Interactive LU Solver */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-400" /> Interactive 2×2 LU Linear System Solver
          </h5>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Inputs */}
            <div className="md:col-span-5 p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-300 block">Matrix A entries:</span>
              <div className="grid grid-cols-2 gap-2 max-w-[180px] mx-auto">
                <input
                  type="number"
                  value={l11}
                  onChange={e => setL11(Number(e.target.value))}
                  className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
                  title="A11"
                />
                <input
                  type="number"
                  value={l12}
                  onChange={e => setL12(Number(e.target.value))}
                  className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
                  title="A12"
                />
                <input
                  type="number"
                  value={l21}
                  onChange={e => setL21(Number(e.target.value))}
                  className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
                  title="A21"
                />
                <input
                  type="number"
                  value={l22}
                  onChange={e => setL22(Number(e.target.value))}
                  className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
                  title="A22"
                />
              </div>

              <span className="text-xs font-bold text-slate-300 block pt-2 border-t border-slate-800">
                Target Vector r:
              </span>
              <div className="grid grid-cols-2 gap-2 max-w-[180px] mx-auto">
                <input
                  type="number"
                  value={lr1}
                  onChange={e => setLr1(Number(e.target.value))}
                  className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
                  title="r1"
                />
                <input
                  type="number"
                  value={lr2}
                  onChange={e => setLr2(Number(e.target.value))}
                  className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
                  title="r2"
                />
              </div>
            </div>

            {/* Calculated LU Factors & Solution */}
            <div className="md:col-span-7 p-3.5 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-2.5">
              {luStats.error ? (
                <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-800 text-rose-300 text-xs font-sans">
                  <AlertTriangle className="w-4 h-4 inline-block mr-1 text-rose-400" />
                  {luStats.error}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-slate-950 rounded border border-slate-800">
                      <span className="text-blue-400 font-bold block mb-1">Matrix L:</span>
                      <div>[ 1.000, 0.000 ]</div>
                      <div>[ {luStats.lMultiplier?.toFixed(3)}, 1.000 ]</div>
                    </div>
                    <div className="p-2 bg-slate-950 rounded border border-slate-800">
                      <span className="text-indigo-400 font-bold block mb-1">Matrix U:</span>
                      <div>[ {luStats.u11?.toFixed(3)}, {luStats.u12?.toFixed(3)} ]</div>
                      <div>[ 0.000, {luStats.u22?.toFixed(3)} ]</div>
                    </div>
                  </div>

                  <div className="p-2 bg-slate-950 rounded border border-slate-800 space-y-1">
                    <div className="text-slate-400">
                      Forward Subst (Ly = r) → <strong className="text-amber-300 font-bold">y = [{luStats.y1?.toFixed(3)}, {luStats.y2?.toFixed(3)}]ᵀ</strong>
                    </div>
                    <div className="text-slate-400">
                      Back Subst (Ux = y) → <strong className="text-emerald-400 font-bold text-sm">x = [{luStats.x1?.toFixed(3)}, {luStats.x2?.toFixed(3)}]ᵀ</strong>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 font-sans flex items-center gap-1.5 pt-1">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    System Check: <MathText text={`$\\mathbf{A}\\mathbf{x} = [${luStats.checkR1?.toFixed(2)}, ${luStats.checkR2?.toFixed(2)}]^T = \\mathbf{r}$`} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. SINGULAR VALUE DECOMPOSITION (SVD) */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Minimize2 className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white">Singular Value Decomposition (SVD)</h4>
          </div>
          <span className="text-xs text-slate-400">Spectral Factorization &amp; Low-Rank Compression</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          SVD decomposes any real matrix into two orthonormal rotation matrices <MathText text="$\mathbf{U}$" /> and <MathText text="$\mathbf{V}^T$" />, separated by a diagonal matrix <MathText text="$\mathbf{\Sigma}$" /> of non-negative singular values arranged in descending order:
        </p>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-center text-xs text-white">
          <MathText text="$\mathbf{A} = \mathbf{U}\mathbf{\Sigma}\mathbf{V}^T = \sum_{i=1}^r \sigma_i \mathbf{u}_i \mathbf{v}_i^T \quad \text{with} \quad \sigma_1 \ge \sigma_2 \ge \dots \ge \sigma_r \ge 0$" />
        </div>

        {/* 3 Matrix Roles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-blue-400 block">Matrix U (Output Basis)</span>
            <p className="text-xs text-slate-300">
              Left singular vectors. Columns are orthonormal eigenvectors of <MathText text="$\mathbf{A}\mathbf{A}^T$" /> that capture principal output directions.
            </p>
          </div>
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-emerald-400 block">Matrix Σ (Singular Values)</span>
            <p className="text-xs text-slate-300">
              Square roots of eigenvalues of <MathText text="$\mathbf{A}^T\mathbf{A}$" /> (<MathText text="$\sigma_i = \sqrt{\lambda_i}$" />). Represents the energy/scaling along each mode.
            </p>
          </div>
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-amber-400 block">Matrix Vᵀ (Input Basis)</span>
            <p className="text-xs text-slate-300">
              Right singular vectors. Rows are orthonormal eigenvectors of <MathText text="$\mathbf{A}^T\mathbf{A}$" /> representing principal input directions.
            </p>
          </div>
        </div>

        {/* Interactive SVD Spectrum & Truncation Tool */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Minimize2 className="w-4 h-4 text-blue-400" />
              Interactive 2×2 SVD &amp; Energy Truncation Lab
            </h5>
            <span className="text-xs text-slate-400 font-mono">Eckart-Young Low-Rank Approximation</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            {/* Matrix Inputs & Rank Slider */}
            <div className="md:col-span-6 p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-300 block">Matrix A entries:</span>
              <div className="grid grid-cols-2 gap-2 max-w-[180px]">
                <input
                  type="number"
                  value={s11}
                  onChange={e => setS11(Number(e.target.value))}
                  className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
                  title="A11"
                />
                <input
                  type="number"
                  value={s12}
                  onChange={e => setS12(Number(e.target.value))}
                  className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
                  title="A12"
                />
                <input
                  type="number"
                  value={s21}
                  onChange={e => setS21(Number(e.target.value))}
                  className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
                  title="A21"
                />
                <input
                  type="number"
                  value={s22}
                  onChange={e => setS22(Number(e.target.value))}
                  className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
                  title="A22"
                />
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300">Keep Top-k Singular Values:</span>
                  <span className="font-bold text-blue-400 font-mono">k = {rankK}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="2"
                  value={rankK}
                  onChange={e => setRankK(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>k=1 (Rank-1 Truncation)</span>
                  <span>k=2 (Full Reconstruction)</span>
                </div>
              </div>
            </div>

            {/* SVD Analytics */}
            <div className="md:col-span-6 p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-2.5">
              <div className="text-slate-300">
                <span className="text-slate-400 block text-[11px]">Normal Matrix AᵀA:</span>
                [{svdStats.ata11.toFixed(2)}, {svdStats.ata12.toFixed(2)}; {svdStats.ata12.toFixed(2)}, {svdStats.ata22.toFixed(2)}]
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800">
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-emerald-400 font-bold block">σ₁ (Principal):</span>
                  <span className="text-base text-white">{svdStats.sigma1.toFixed(4)}</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-indigo-400 font-bold block">σ₂ (Secondary):</span>
                  <span className="text-base text-white">{svdStats.sigma2.toFixed(4)}</span>
                </div>
              </div>

              {/* Energy Retained Gauge */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-xs font-sans">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Percent className="w-3.5 h-3.5 text-emerald-400" /> Retained Energy:
                  </span>
                  <span className="font-bold text-emerald-300 font-mono">{svdStats.energyPct.toFixed(2)}%</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.max(0, svdStats.energyPct))}%` }}
                  />
                </div>
              </div>

              <p className="font-sans text-[11px] text-slate-400 leading-relaxed pt-1">
                {rankK === 1 ? (
                  <span>
                    <strong>Rank-1 Approximation:</strong> Discarding <MathText text="$\sigma_2$" /> reduces memory storage while preserving <strong>{svdStats.energyPct.toFixed(1)}%</strong> of variance (foundation of Low-Rank Adaptation &amp; PCA).
                  </span>
                ) : (
                  <span>
                    <strong>Full Rank-2 Reconstruction:</strong> Exactly 100% of the matrix spectrum is preserved without information loss.
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Module1LinearAlgebra;
