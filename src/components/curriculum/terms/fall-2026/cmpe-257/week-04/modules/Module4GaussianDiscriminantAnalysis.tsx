import React, { useState } from 'react';
import {
  Compass,
  Layers,
  Sparkles,
  Zap,
  Sliders,
  CheckCircle2,
  Table,
  Activity,
  HeartPulse,
  Scale,
  Maximize2
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module4GaussianDiscriminantAnalysis: React.FC = () => {
  // ── Interactive 1: 1D Gaussian Density & Comparison ───────────────────
  const [queryBP, setQueryBP] = useState<number>(150);
  const muH1D = 120, sigmaH1D = 10;
  const muS1D = 160, sigmaS1D = 15;
  const priorH1D = 0.70, priorS1D = 0.30;

  const normPdf1D = (x: number, mu: number, sigma: number) => {
    return (1 / (Math.sqrt(2 * Math.PI) * sigma)) * Math.exp(-Math.pow(x - mu, 2) / (2 * Math.pow(sigma, 2)));
  };

  const likH1D = normPdf1D(queryBP, muH1D, sigmaH1D);
  const likS1D = normPdf1D(queryBP, muS1D, sigmaS1D);
  const scoreH1D = likH1D * priorH1D;
  const scoreS1D = likS1D * priorS1D;
  const postH1D = (scoreH1D + scoreS1D) > 0 ? (scoreH1D / (scoreH1D + scoreS1D)) : 0;
  const postS1D = (scoreH1D + scoreS1D) > 0 ? (scoreS1D / (scoreH1D + scoreS1D)) : 0;

  // ── Interactive 2: 2D GDA Patient Classifier ──────────────────────────
  const [patientBP, setPatientBP] = useState<number>(145);
  const [patientChol, setPatientChol] = useState<number>(205);

  // Healthy statistics from the 8-patient dataset (Session 4 Module 4 HTML)
  const muH = [125.2, 186.0];
  const covH = [
    [36.56, 27.8],
    [27.8, 74.0]
  ];
  const detH = covH[0][0] * covH[1][1] - covH[0][1] * covH[1][0]; // 1932.6
  const invH = [
    [covH[1][1] / detH, -covH[0][1] / detH],
    [-covH[1][0] / detH, covH[0][0] / detH]
  ];
  const priorH = 5 / 8; // 0.625

  // Sick statistics from the 8-patient dataset
  const muS = [160.0, 221.6667];
  const covS = [
    [66.6667, 50.0],
    [50.0, 105.5556]
  ];
  const detS = covS[0][0] * covS[1][1] - covS[0][1] * covS[1][0]; // ~4537.037
  const invS = [
    [covS[1][1] / detS, -covS[0][1] / detS],
    [-covS[1][0] / detS, covS[0][0] / detS]
  ];
  const priorS = 3 / 8; // 0.375

  // Healthy 2D density calculation
  const devH = [patientBP - muH[0], patientChol - muH[1]];
  const distH = devH[0] * (invH[0][0] * devH[0] + invH[0][1] * devH[1]) +
                devH[1] * (invH[1][0] * devH[0] + invH[1][1] * devH[1]);
  const scaleFactorH = 1 / (2 * Math.PI * Math.sqrt(detH));
  const likH = scaleFactorH * Math.exp(-0.5 * distH);
  const scoreH = likH * priorH;

  // Sick 2D density calculation
  const devS = [patientBP - muS[0], patientChol - muS[1]];
  const distS = devS[0] * (invS[0][0] * devS[0] + invS[0][1] * devS[1]) +
                devS[1] * (invS[1][0] * devS[0] + invS[1][1] * devS[1]);
  const scaleFactorS = 1 / (2 * Math.PI * Math.sqrt(detS));
  const likS = scaleFactorS * Math.exp(-0.5 * distS);
  const scoreS = likS * priorS;

  const totalEvidence2D = scoreH + scoreS;
  const postH2D = totalEvidence2D > 0 ? (scoreH / totalEvidence2D) : 0;
  const postS2D = totalEvidence2D > 0 ? (scoreS / totalEvidence2D) : 0;

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Module Roadmap ─────────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Compass className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Module Roadmap</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Master the multivariate mathematics of Gaussian Discriminant Analysis: continuous class conditionals, mean vectors, covariance matrices, likelihood evaluations, and Bayesian decision boundaries:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs pt-1">
          {[
            { num: 1, title: 'Why GDA Is Needed' },
            { num: 2, title: 'The Gaussian Distribution' },
            { num: 3, title: 'Class-Conditional Gaussians' },
            { num: 4, title: 'From 1D to Multiple Features' },
            { num: 5, title: 'Covariance & Covariance Matrix' },
            { num: 6, title: 'The Multivariate Gaussian' },
            { num: 7, title: 'Training GDA (MLE Parameters)' },
            { num: 8, title: 'Complete Classification Example' }
          ].map(topic => (
            <div key={topic.num} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                {topic.num}
              </span>
              <span className="text-slate-300 text-[11px] font-medium leading-tight">{topic.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Why GDA Is Needed ──────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <HeartPulse className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Why GDA Is Needed</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          <strong>Gaussian Discriminant Analysis (GDA)</strong> is a generative classification model designed specifically for <em>continuous numerical features</em> (such as blood pressure, cholesterol, glucose, income, or temperature).
        </p>

        <p className="text-xs text-slate-300 leading-relaxed">
          Instead of fitting an ad-hoc boundary directly, GDA models the physical distribution of features within each class. For an incoming patient, it evaluates two probabilistic questions:
        </p>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-center text-xs space-y-1">
          <div className="text-cyan-300">
            <MathText text="$$P(x \mid \text{Healthy}) \qquad \text{and} \qquad P(x \mid \text{Sick})$$" displayMode={true} />
          </div>
          <span className="text-[11px] text-slate-400 font-sans block pt-1">
            "If this patient were Healthy, how likely would these measurements be? If Sick, how likely would they be?"
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          GDA assumes that the continuous features of each class can be modeled as a Gaussian (bell-shaped) distribution, and combines this likelihood with the class prior <MathText text="$P(y)$" /> using Bayes’ theorem.
        </p>
      </div>

      {/* ── The Gaussian Distribution ──────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <Layers className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">The Gaussian Distribution</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          A Gaussian distribution is fully characterized by its center (mean <MathText text="$\mu$" />) and its dispersion (variance <MathText text="$\sigma^2$" /> or standard deviation <MathText text="$\sigma$" />):
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-center font-mono">
            <span className="text-slate-400 font-sans block">1. Mean (<MathText text="$\mu$" />)</span>
            <div className="text-cyan-300"><MathText text="$$\mu = \frac{1}{N}\sum_{i=1}^N x_i$$" displayMode={true} /></div>
            <span className="text-[11px] text-slate-500 font-sans block">Center of the bell curve.</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-center font-mono">
            <span className="text-slate-400 font-sans block">2. Variance (<MathText text="$\sigma^2$" />)</span>
            <div className="text-emerald-300"><MathText text="$$\sigma^2 = \frac{1}{N}\sum_{i=1}^N (x_i - \mu)^2$$" displayMode={true} /></div>
            <span className="text-[11px] text-slate-500 font-sans block">Mean squared deviation.</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-center font-mono">
            <span className="text-slate-400 font-sans block">3. Z-Score (<MathText text="$z$" />)</span>
            <div className="text-purple-300"><MathText text="$$z = \frac{x - \mu}{\sigma}$$" displayMode={true} /></div>
            <span className="text-[11px] text-slate-500 font-sans block">Standard deviations from mean.</span>
          </div>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-semibold text-slate-200">1D Gaussian Probability Density Function:</span>
          <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-center text-amber-300 text-xs">
            <MathText text="$$p(x \mid \mu, \sigma^2) = \frac{1}{\sqrt{2\pi\sigma^2}} \exp\left( -\frac{(x - \mu)^2}{2\sigma^2} \right)$$" displayMode={true} />
          </div>
          <p className="text-slate-400 text-[11px]">
            The <strong>68–95–99.7 Rule:</strong> approximately 68% of Gaussian data points fall within <MathText text="$\pm 1\sigma$" />, 95% fall within <MathText text="$\pm 2\sigma$" />, and 99.7% fall within <MathText text="$\pm 3\sigma$" />.
          </p>
        </div>
      </div>

      {/* ── Class-Conditional Gaussian Distributions ───────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-400">
          <Sparkles className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Class-Conditional Gaussian Distributions</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          GDA fits a distinct Gaussian density to each class. Consider blood pressure in healthy patients vs. sick patients:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-sans font-bold">Healthy Class Parameters:</span>
            <div className="text-slate-300">Mean <MathText text="$\mu_H = 120$" /> mmHg &nbsp;|&nbsp; Std <MathText text="$\sigma_H = 10$" /></div>
            <div className="text-slate-400 text-[11px] font-sans">Prior <MathText text="$P(\text{Healthy}) = 0.70$" /></div>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-rose-400 font-sans font-bold">Sick Class Parameters:</span>
            <div className="text-slate-300">Mean <MathText text="$\mu_S = 160$" /> mmHg &nbsp;|&nbsp; Std <MathText text="$\sigma_S = 15$" /></div>
            <div className="text-slate-400 text-[11px] font-sans">Prior <MathText text="$P(\text{Sick}) = 0.30$" /></div>
          </div>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
          <span className="font-semibold text-slate-200 font-sans">Worked Evaluation for Query Patient <MathText text="$x = 150$" /> mmHg:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-center">
            <div className="p-2.5 bg-slate-900 rounded-lg">
              <span className="text-[10px] text-slate-500 font-sans block">Likelihood under Healthy</span>
              <MathText text="$$p(150 \mid H) = \frac{1}{\sqrt{200\pi}} e^{-\frac{(150-120)^2}{200}} \approx \mathbf{0.000443}$$" displayMode={true} />
            </div>
            <div className="p-2.5 bg-slate-900 rounded-lg">
              <span className="text-[10px] text-slate-500 font-sans block">Likelihood under Sick</span>
              <MathText text="$$p(150 \mid S) = \frac{1}{\sqrt{450\pi}} e^{-\frac{(150-160)^2}{450}} \approx \mathbf{0.0213}$$" displayMode={true} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-center pt-1">
            <div className="p-2 bg-slate-900 rounded-lg">
              <span className="text-[10px] text-slate-500 font-sans block">Healthy Score: P(x|H)P(H)</span>
              <MathText text="$$0.000443 \times 0.70 = \mathbf{0.000310}$$" displayMode={true} />
            </div>
            <div className="p-2 bg-slate-900 rounded-lg border border-rose-500/30">
              <span className="text-[10px] text-rose-400 font-sans block font-semibold">Sick Score: P(x|S)P(S)</span>
              <MathText text="$$0.0213 \times 0.30 = \mathbf{0.00639}$$" displayMode={true} />
            </div>
          </div>

          <p className="text-emerald-300 font-sans text-center pt-1 font-semibold">
            Outcome: Because <MathText text="$0.00639 \gg 0.000310$" />, Sick has the higher joint score and is predicted!
          </p>
        </div>
      </div>

      {/* ── Interactive 1: 1D Gaussian Comparison ──────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400">
            <Sliders className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Interactive — 1D Gaussian Likelihood Evaluator</h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Query: {queryBP} mmHg
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Slide the patient's blood pressure measurement to see how the competing Healthy and Sick Gaussian densities evaluate in real time:
        </p>

        <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Patient Blood Pressure (<MathText text="$x$" />):</span>
            <span className="font-mono text-cyan-300 font-bold">{queryBP} mmHg</span>
          </div>
          <input
            type="range"
            min="100"
            max="190"
            step="1"
            value={queryBP}
            onChange={(e) => setQueryBP(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>100 (Low)</span>
            <span>120 (Healthy Mean)</span>
            <span>160 (Sick Mean)</span>
            <span>190 (High)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center text-xs font-mono">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 font-sans block mb-1">P(Healthy | x)</span>
            <span className="text-base font-bold text-emerald-400">{(postH1D * 100).toFixed(1)}%</span>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div style={{ width: `${postH1D * 100}%` }} className="bg-emerald-500 h-full" />
            </div>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 font-sans block mb-1">P(Sick | x)</span>
            <span className="text-base font-bold text-rose-400">{(postS1D * 100).toFixed(1)}%</span>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div style={{ width: `${postS1D * 100}%` }} className="bg-rose-500 h-full" />
            </div>
          </div>
        </div>
      </div>

      {/* ── From One Feature to Multiple Features ───────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <Activity className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">From One Feature to Multiple Features</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          When observing both Blood Pressure (<MathText text="$x_1$" />) and Cholesterol (<MathText text="$x_2$" />), a patient becomes a column vector:
        </p>

        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-cyan-300 text-xs">
          <MathText text="$$x = [x_1, x_2]^T = [160, 230]^T$$" displayMode={true} />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Each class center is governed by a <strong>mean vector</strong> <MathText text="$\mu$" />. If the class averages are 157.5 mmHg and 228.75 mg/dL:
        </p>

        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-emerald-300 text-xs">
          <MathText text="$$x - \mu = [160 - 157.5, \; 230 - 228.75]^T = [2.5, \; 1.25]^T$$" displayMode={true} />
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          With multiple features, a single variance is insufficient. We need to describe how each feature varies individually, and how features vary <em>together</em>. That description is the <strong>covariance matrix</strong>.
        </p>
      </div>

      {/* ── Covariance and the Covariance Matrix ────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-amber-400">
          <Table className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Covariance and the Covariance Matrix</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Variance measures the spread of a single feature. <strong>Covariance</strong> measures whether two features move together:
        </p>

        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-amber-300 text-xs">
          <MathText text="$$\text{Cov}(x_1, x_2) = \frac{1}{N}\sum_{i=1}^N (x_{i1} - \mu_1)(x_{i2} - \mu_2)$$" displayMode={true} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 font-sans">
              <tr>
                <th className="py-2 px-3 text-cyan-300">Patient</th>
                <th className="py-2 px-3 text-slate-300">BP (<MathText text="$x_1$" />)</th>
                <th className="py-2 px-3 text-slate-300">Cholesterol (<MathText text="$x_2$" />)</th>
                <th className="py-2 px-3 text-emerald-300">BP Deviation (<MathText text="$x_1 - 127$" />)</th>
                <th className="py-2 px-3 text-emerald-300">Chol Deviation (<MathText text="$x_2 - 188.75$" />)</th>
                <th className="py-2 px-3 text-amber-300">Cross-Product</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr><td className="py-1.5 px-3 font-semibold text-slate-400">1</td><td className="py-1.5 px-3">120</td><td className="py-1.5 px-3">180</td><td className="py-1.5 px-3 text-slate-300">-7.0</td><td className="py-1.5 px-3 text-slate-300">-8.75</td><td className="py-1.5 px-3 text-amber-300">+61.25</td></tr>
              <tr><td className="py-1.5 px-3 font-semibold text-slate-400">2</td><td className="py-1.5 px-3">125</td><td className="py-1.5 px-3">190</td><td className="py-1.5 px-3 text-slate-300">-2.0</td><td className="py-1.5 px-3 text-slate-300">+1.25</td><td className="py-1.5 px-3 text-amber-300">-2.50</td></tr>
              <tr><td className="py-1.5 px-3 font-semibold text-slate-400">3</td><td className="py-1.5 px-3">135</td><td className="py-1.5 px-3">185</td><td className="py-1.5 px-3 text-slate-300">+8.0</td><td className="py-1.5 px-3 text-slate-300">-3.75</td><td className="py-1.5 px-3 text-amber-300">-30.00</td></tr>
              <tr><td className="py-1.5 px-3 font-semibold text-slate-400">4</td><td className="py-1.5 px-3">128</td><td className="py-1.5 px-3">200</td><td className="py-1.5 px-3 text-slate-300">+1.0</td><td className="py-1.5 px-3 text-slate-300">+11.25</td><td className="py-1.5 px-3 text-amber-300">+11.25</td></tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-slate-900 rounded-lg">
              <span className="text-[10px] text-slate-500 font-sans block">BP Variance (<MathText text="$\sigma_1^2$" />)</span>
              <MathText text="$$118 / 4 = \mathbf{29.5}$$" displayMode={true} />
            </div>
            <div className="p-2 bg-slate-900 rounded-lg">
              <span className="text-[10px] text-slate-500 font-sans block">Chol Variance (<MathText text="$\sigma_2^2$" />)</span>
              <MathText text="$$218.75 / 4 = \mathbf{54.6875}$$" displayMode={true} />
            </div>
            <div className="p-2 bg-slate-900 rounded-lg">
              <span className="text-[10px] text-slate-500 font-sans block">Covariance (<MathText text="$\text{Cov}(x_1, x_2)$" />)</span>
              <MathText text="$$40 / 4 = \mathbf{10.0}$$" displayMode={true} />
            </div>
          </div>

          <div className="p-3 bg-slate-900 rounded-lg text-center font-mono text-cyan-300">
            <span className="text-slate-400 font-sans block mb-1">Resulting 2x2 Covariance Matrix:</span>
            <MathText text="$$\Sigma = \begin{bmatrix} 29.5 & 10.0 \\ 10.0 & 54.6875 \end{bmatrix}$$" displayMode={true} />
          </div>
          <p className="text-slate-400 font-sans text-[11px]">
            The main diagonal holds individual variances. The off-diagonal holds covariance. Positive covariance indicates that patients with higher blood pressure tend to have higher cholesterol.
          </p>
        </div>
      </div>

      {/* ── The Multivariate Gaussian Distribution ─────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-purple-400">
          <Maximize2 className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">The Multivariate Gaussian Distribution</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          For <MathText text="$D$" /> continuous features, the joint class-conditional likelihood is parameterized by mean vector <MathText text="$\mu$" /> and covariance matrix <MathText text="$\Sigma$" />:
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-center text-cyan-300 text-xs">
          <MathText text="$$p(x \mid \mu, \Sigma) = \frac{1}{(2\pi)^{D/2} |\Sigma|^{1/2}} \exp\left( -\frac{1}{2} (x - \mu)^T \Sigma^{-1} (x - \mu) \right)$$" displayMode={true} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 font-sans">
              <tr>
                <th className="py-2 px-3 text-cyan-300">Symbol</th>
                <th className="py-2 px-3 text-slate-300">Name & Role</th>
                <th className="py-2 px-3 text-emerald-300">Mathematical Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50 font-sans">
              <tr>
                <td className="py-2 px-3 font-semibold text-cyan-300 font-mono">x</td>
                <td className="py-2 px-3 text-slate-300">Feature Vector (<MathText text="$D \times 1$" />)</td>
                <td className="py-2 px-3 text-slate-400">The observation's coordinate values in feature space.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-emerald-300 font-mono">\mu</td>
                <td className="py-2 px-3 text-slate-300">Mean Vector (<MathText text="$D \times 1$" />)</td>
                <td className="py-2 px-3 text-slate-400">The center of mass of the Gaussian cloud.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-amber-300 font-mono">\Sigma</td>
                <td className="py-2 px-3 text-slate-300">Covariance Matrix (<MathText text="$D \times D$" />)</td>
                <td className="py-2 px-3 text-slate-400">Describes spread along axes and pairwise correlations.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-purple-300 font-mono">\Sigma^{-1}</td>
                <td className="py-2 px-3 text-slate-300">Precision / Inverse Covariance</td>
                <td className="py-2 px-3 text-slate-400">Normalizes distances for variance and correlation.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-rose-300 font-mono">|\Sigma|</td>
                <td className="py-2 px-3 text-slate-300">Determinant of <MathText text="$\Sigma$" /></td>
                <td className="py-2 px-3 text-slate-400">Scalar volume quantifying the overall spatial dispersion.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1 text-slate-300">
          <strong className="text-amber-300">Mahalanobis Squared Distance:</strong> The quadratic exponent <MathText text="$(x - \mu)^T \Sigma^{-1} (x - \mu)$" /> measures statistical distance in standard-deviation units. When features are uncorrelated (<MathText text="$\Sigma$" /> diagonal), it collapses directly to standardized Euclidean:
          <div className="bg-slate-900 p-2 rounded text-center font-mono text-cyan-300 mt-1">
            <MathText text="$$\sum_{j=1}^D \frac{(x_j - \mu_j)^2}{\sigma_j^2}$$" displayMode={true} />
          </div>
        </div>
      </div>

      {/* ── Training GDA (MLE Parameters) ──────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Zap className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Training GDA: Maximum Likelihood Estimation</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Given <MathText text="$N$" /> training observations, training GDA involves computing closed-form MLE parameter estimates for the class prior <MathText text="$P(y)$" />, class mean <MathText text="$\mu_k$" />, and covariance matrix <MathText text="$\Sigma_k$" />:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 font-sans">
              <tr>
                <th className="py-2 px-3 text-cyan-300">Patient</th>
                <th className="py-2 px-3 text-slate-300">Blood Pressure (<MathText text="$x_1$" />)</th>
                <th className="py-2 px-3 text-slate-300">Cholesterol (<MathText text="$x_2$" />)</th>
                <th className="py-2 px-3 text-amber-300">Class Label</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr><td className="py-1 px-3 text-slate-400">1</td><td className="py-1 px-3">120</td><td className="py-1 px-3">180</td><td className="py-1 px-3 text-emerald-400 font-sans font-semibold">Healthy</td></tr>
              <tr><td className="py-1 px-3 text-slate-400">2</td><td className="py-1 px-3">125</td><td className="py-1 px-3">190</td><td className="py-1 px-3 text-emerald-400 font-sans font-semibold">Healthy</td></tr>
              <tr><td className="py-1 px-3 text-slate-400">3</td><td className="py-1 px-3">135</td><td className="py-1 px-3">185</td><td className="py-1 px-3 text-emerald-400 font-sans font-semibold">Healthy</td></tr>
              <tr><td className="py-1 px-3 text-slate-400">4</td><td className="py-1 px-3">128</td><td className="py-1 px-3">200</td><td className="py-1 px-3 text-emerald-400 font-sans font-semibold">Healthy</td></tr>
              <tr><td className="py-1 px-3 text-slate-400">5</td><td className="py-1 px-3">118</td><td className="py-1 px-3">175</td><td className="py-1 px-3 text-emerald-400 font-sans font-semibold">Healthy</td></tr>
              <tr><td className="py-1 px-3 text-slate-400">6</td><td className="py-1 px-3">150</td><td className="py-1 px-3">220</td><td className="py-1 px-3 text-rose-400 font-sans font-semibold">Sick</td></tr>
              <tr><td className="py-1 px-3 text-slate-400">7</td><td className="py-1 px-3">160</td><td className="py-1 px-3">210</td><td className="py-1 px-3 text-rose-400 font-sans font-semibold">Sick</td></tr>
              <tr><td className="py-1 px-3 text-slate-400">8</td><td className="py-1 px-3">170</td><td className="py-1 px-3">235</td><td className="py-1 px-3 text-rose-400 font-sans font-semibold">Sick</td></tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-sans font-bold">Healthy Parameters (N=5):</span>
            <div className="text-slate-300">Prior <MathText text="$P(H) = 5/8 = \mathbf{0.625}$" /></div>
            <div className="text-cyan-300"><MathText text="$$\mu_H = [125.2, 186.0]^T$$" displayMode={true} /></div>
            <div className="text-slate-300"><MathText text="$$\Sigma_H = \begin{bmatrix} 36.56 & 27.80 \\ 27.80 & 74.00 \end{bmatrix}$$" displayMode={true} /></div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-rose-400 font-sans font-bold">Sick Parameters (N=3):</span>
            <div className="text-slate-300">Prior <MathText text="$P(S) = 3/8 = \mathbf{0.375}$" /></div>
            <div className="text-cyan-300"><MathText text="$$\mu_S = [160.0, 221.67]^T$$" displayMode={true} /></div>
            <div className="text-slate-300"><MathText text="$$\Sigma_S = \begin{bmatrix} 66.67 & 50.00 \\ 50.00 & 105.56 \end{bmatrix}$$" displayMode={true} /></div>
          </div>
        </div>
      </div>

      {/* ── Complete Classification Example ────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Complete 2D Classification Worked Example</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Suppose a new patient arrives with Blood Pressure = <strong className="text-white">145</strong> mmHg and Cholesterol = <strong className="text-white">205</strong> mg/dL (<MathText text="$x = [145, 205]^T$" />):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          {/* Healthy Evaluation */}
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="text-emerald-400 font-sans font-bold">1. Healthy Class Evaluation:</span>
            <div className="text-slate-300">Deviation: <MathText text="$x - \mu_H = [19.8, 19.0]^T$" /></div>
            <div className="text-slate-300">Determinant: <MathText text="$|\Sigma_H| = 1932.6$" /></div>
            <div className="text-cyan-300">Adjusted dist: <MathText text="$$(x - \mu_H)^T \Sigma_H^{-1} (x - \mu_H) \approx \mathbf{11.0175}$$" displayMode={true} /></div>
            <div className="text-slate-300">Likelihood: <MathText text="$p(x \mid H) \approx 0.00001467$" /></div>
            <div className="p-2 bg-slate-900 rounded text-center text-emerald-300">
              Score: <MathText text="$$p(x \mid H) P(H) \approx \mathbf{0.00000917}$$" displayMode={true} />
            </div>
          </div>

          {/* Sick Evaluation */}
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="text-rose-400 font-sans font-bold">2. Sick Class Evaluation:</span>
            <div className="text-slate-300">Deviation: <MathText text="$x - \mu_S = [-15.0, -16.67]^T$" /></div>
            <div className="text-slate-300">Determinant: <MathText text="$|\Sigma_S| \approx 4537.04$" /></div>
            <div className="text-cyan-300">Adjusted dist: <MathText text="$$(x - \mu_S)^T \Sigma_S^{-1} (x - \mu_S) \approx \mathbf{3.8061}$$" displayMode={true} /></div>
            <div className="text-slate-300">Likelihood: <MathText text="$p(x \mid S) \approx 0.0003523$" /></div>
            <div className="p-2 bg-slate-900 rounded text-center text-rose-300">
              Score: <MathText text="$$p(x \mid S) P(S) \approx \mathbf{0.0001321}$$" displayMode={true} />
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono text-center">
          <div className="text-slate-400 font-sans">Total Evidence Denominator: <MathText text="$P(x) = 0.00000917 + 0.0001321 = 0.0001413$" /></div>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-2.5 bg-slate-900 rounded-lg">
              <span className="text-[10px] text-slate-500 font-sans block">P(Healthy | x)</span>
              <span className="text-cyan-300 font-bold text-sm">6.49%</span>
            </div>
            <div className="p-2.5 bg-rose-950/30 border border-rose-500/30 rounded-lg">
              <span className="text-[10px] text-rose-400 font-sans block font-semibold">P(Sick | x)</span>
              <span className="text-rose-300 font-bold text-sm">93.51%</span>
            </div>
          </div>
          <p className="text-emerald-300 font-sans pt-1 font-semibold">
            Final Prediction: Sick (The patient is diagnosed Sick with 93.51% posterior certainty).
          </p>
        </div>
      </div>

      {/* ── Interactive 3: Complete 2D GDA Patient Classifier ───────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400">
            <Sliders className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Interactive — Complete 2D GDA Patient Classifier</h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Live 2D Evaluation
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Input arbitrary patient measurements to see GDA invert covariance matrices, compute Mahalanobis distances, and calculate posterior diagnosis probabilities in real time:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="space-y-1">
            <div className="flex justify-between text-slate-400">
              <span>Patient Blood Pressure (mmHg):</span>
              <span className="font-mono text-cyan-300 font-bold">{patientBP}</span>
            </div>
            <input
              type="range"
              min="110"
              max="180"
              step="1"
              value={patientBP}
              onChange={(e) => setPatientBP(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-slate-400">
              <span>Patient Cholesterol (mg/dL):</span>
              <span className="font-mono text-purple-300 font-bold">{patientChol}</span>
            </div>
            <input
              type="range"
              min="160"
              max="240"
              step="1"
              value={patientChol}
              onChange={(e) => setPatientChol(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center text-xs font-mono">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 font-sans block mb-1">P(Healthy | x)</span>
            <span className="text-base font-bold text-emerald-400">{(postH2D * 100).toFixed(2)}%</span>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div style={{ width: `${postH2D * 100}%` }} className="bg-emerald-500 h-full" />
            </div>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 font-sans block mb-1">P(Sick | x)</span>
            <span className="text-base font-bold text-rose-400">{(postS2D * 100).toFixed(2)}%</span>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div style={{ width: `${postS2D * 100}%` }} className="bg-rose-500 h-full" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Single-Feature versus Multi-Feature Likelihood ─────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <Scale className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Single-Feature vs. Multi-Feature Likelihood</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 font-sans">
              <tr>
                <th className="py-2.5 px-3 text-cyan-300">Dimension</th>
                <th className="py-2.5 px-3 text-slate-300">Single-Feature Model (1D)</th>
                <th className="py-2.5 px-3 text-emerald-300">Multi-Feature Model (<MathText text="$D$" />-Dimensional)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50 font-sans">
              <tr>
                <td className="py-2 px-3 font-semibold text-slate-400">Input Data</td>
                <td className="py-2 px-3 font-mono text-slate-300">Scalar number <MathText text="$x$" /></td>
                <td className="py-2 px-3 font-mono text-emerald-300">Vector <MathText text="$x = [x_1, \dots, x_D]^T$" /></td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-slate-400">Class Center</td>
                <td className="py-2 px-3 font-mono text-slate-300">Scalar mean <MathText text="$\mu$" /></td>
                <td className="py-2 px-3 font-mono text-emerald-300">Mean vector <MathText text="$\mu = [\mu_1, \dots, \mu_D]^T$" /></td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-slate-400">Class Dispersion</td>
                <td className="py-2 px-3 font-mono text-slate-300">Scalar variance <MathText text="$\sigma^2$" /></td>
                <td className="py-2 px-3 font-mono text-emerald-300">Covariance matrix <MathText text="$\Sigma \in \mathbb{R}^{D \times D}$" /></td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-slate-400">Likelihood Formula</td>
                <td className="py-2 px-3 font-mono text-slate-300 text-xs">
                  <MathText text="$$p(x \mid y) = \frac{1}{\sqrt{2\pi\sigma_y^2}} e^{-\frac{(x-\mu_y)^2}{2\sigma_y^2}}$$" displayMode={true} />
                </td>
                <td className="py-2 px-3 font-mono text-emerald-300 text-xs">
                  <MathText text="$$p(x \mid y) = \frac{1}{(2\pi)^{D/2}|\Sigma_y|^{1/2}} e^{-\frac{1}{2}(x-\mu_y)^T\Sigma_y^{-1}(x-\mu_y)}$$" displayMode={true} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Final Module Recap ─────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <CheckCircle2 className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Module Recap</h3>
        </div>
        <ol className="text-xs text-slate-300 space-y-1.5 list-decimal list-inside leading-relaxed">
          <li><strong>GDA</strong> models continuous numerical features within each class using Gaussian distributions.</li>
          <li>Each class is parameterized by a prior <MathText text="$P(y)$" />, mean vector <MathText text="$\mu_y$" />, and covariance matrix <MathText text="$\Sigma_y$" />.</li>
          <li>The <strong>mean vector</strong> marks the centroid of the class cloud in feature space.</li>
          <li>The <strong>covariance matrix</strong> describes the individual feature variances along the diagonal and pairwise covariances off-diagonal.</li>
          <li>The <strong>multivariate Gaussian density</strong> provides the class-conditional likelihood <MathText text="$P(x \mid y)$" />.</li>
          <li><strong>Bayes’ theorem</strong> scales the likelihood by the class prior: <MathText text="$P(y \mid x) \propto P(x \mid y)P(y)$" />.</li>
          <li>The class with the largest posterior probability (or largest unnormalized score) is chosen as the prediction.</li>
        </ol>
      </div>
    </div>
  );
};
