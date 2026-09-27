import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  HelpCircle,
  Check,
  CheckCircle2,
  TreeDeciduous,
  ArrowRight,
  ShieldAlert,
  Sliders,
  AlertCircle,
  Scale,
  Activity,
  Layers,
  BarChart2,
  Table,
  ChevronDown,
  ChevronUp,
  Split,
  Maximize2
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module1WhyDecisionTrees: React.FC = () => {
  // ── Part 6 Interactive VIF Calculator State ───────────────────────────
  const [rSq, setRSq] = useState<number>(0.80);
  const vif = useMemo(() => {
    if (rSq >= 0.999) return 1000;
    return 1 / (1 - rSq);
  }, [rSq]);

  const vifStatus = useMemo(() => {
    if (vif < 5) return { label: 'Low Multicollinearity (Safe)', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
    if (vif < 10) return { label: 'Moderate Multicollinearity (Caution)', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
    return { label: 'Severe Multicollinearity (Unstable)', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' };
  }, [vif]);

  // ── Heteroscedasticity Toggle ──────────────────────────────────────────
  const [residualType, setResidualType] = useState<'homoscedastic' | 'heteroscedastic'>('heteroscedastic');

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Linear Relationship Assumption ──────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Scale className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">The Linear Relationship Assumption</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Standard linear regression models assume that the response changes by a constant slope for every unit increase in an input feature:
        </p>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center font-mono text-sm text-cyan-300">
          <MathText text="$$\hat{y} = \theta^T x + b \quad \implies \quad \hat{y} = \theta_0 + \theta_1 x_1$$" displayMode={true} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">The Rigidity Flaw</span>
            <p className="text-slate-300 leading-relaxed">
              If <MathText text="$\theta_1 = 2$" />, every single 1-unit increase in <MathText text="$x$" /> forces a constant increase of 2 in <MathText text="$\hat{y}$" /> everywhere along the line.
              This constant slope assumption fails whenever real-world relationships curve, saturate, have sharp thresholds, or exhibit distinct localized regimes.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">Real-World Housing Example</span>
            <p className="text-slate-300 leading-relaxed">
              Increasing house square footage by 500 sq ft increases property value strongly for small starter homes, but has diminishing marginal returns for massive luxury estates.
              One straight line cannot capture this non-linear curvature without manual polynomial feature engineering.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-200">
          <strong>Decision-Tree Resolution:</strong> Split input space into separate sub-regions (e.g. <MathText text="$\text{Size} \le 1800$" /> vs <MathText text="$\text{Size} > 1800$" />) and fit distinct piecewise constant or localized predictions inside each region.
        </div>
      </div>

      {/* ── Outliers and Squared Error Penalty ─────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-rose-400">
          <AlertCircle className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Outlier Vulnerability & Squared Error Distortion</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          An outlier is an atypical observation far from the central data distribution. Linear regression fits parameters by minimizing the Sum of Squared Errors (SSE):
        </p>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center font-mono text-sm text-rose-300">
          <MathText text="$$\text{SSE} = \sum_{i=1}^m (y_i - \hat{y}_i)^2$$" displayMode={true} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-rose-400 uppercase tracking-wider text-[11px]">Quadratic Punishment Law</span>
            <p className="text-slate-300 leading-relaxed">
              Squaring residual distances makes large errors exponentially dominant over normal ones:
            </p>
            <div className="p-2 bg-slate-900 rounded font-mono text-center text-rose-300">
              <MathText text="$$10^2 = 100 \quad \text{vs.} \quad 100^2 = 10{,}000 \quad (100\times \text{ higher penalty!})$$" displayMode={true} />
            </div>
            <p className="text-slate-400 text-[11px]">
              A single massive outlier can drag the entire global regression line toward itself, destroying predictive accuracy for the vast majority of normal samples.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">How Decision Trees Resist Outliers</span>
            <p className="text-slate-300 leading-relaxed">
              Because decision trees perform localized step-wise partitions, extreme outliers can simply be isolated into their own separate leaf node or partition.
            </p>
            <div className="p-2 bg-slate-900 rounded font-mono text-center text-emerald-300">
              <MathText text="$$\text{Leaf 1: } x > 95 \implies \text{Outlier Partition}$$" displayMode={true} />
            </div>
            <p className="text-slate-400 text-[11px]">
              The rest of the tree continues to make optimal predictions for ordinary observations without moving any global slopes.
            </p>
          </div>
        </div>
      </div>

      {/* ── Multicollinearity & Its Varieties ─────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <Layers className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Multicollinearity and Its Classifications</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          <strong>Multicollinearity</strong> occurs when two or more predictor features contain overlapping, redundant statistical information.
          For example, house square footage (<MathText text="$x_1$" />) and number of bedrooms (<MathText text="$x_2$" />) are strongly correlated. The model cannot separate how much price increase is due to square footage vs. room count.
        </p>

        {/* Coefficient instability comparison */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-bold text-indigo-300 uppercase tracking-wider text-[11px]">The Parameter Instability Dilemma</span>
          <p className="text-slate-300">
            Two radically different sets of weight coefficients can produce virtually identical overall predictions on training data:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-cyan-300 pt-1">
            <div className="p-2 bg-slate-900 rounded border border-slate-800 text-center">
              <MathText text="$$\hat{y} = 100 + 50 x_1 + 10 x_2$$" displayMode={true} />
            </div>
            <div className="p-2 bg-slate-900 rounded border border-slate-800 text-center">
              <MathText text="$$\hat{y} = 100 + 30 x_1 + 25 x_2$$" displayMode={true} />
            </div>
          </div>
          <p className="text-slate-400 text-[11px] pt-1">
            The individual weights are wildly unstable, making feature attribution impossible even though aggregate loss appears fine.
          </p>
        </div>

        {/* 4 Types of Multicollinearity Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-semibold text-indigo-300">Type</th>
                <th className="py-2.5 px-3 font-semibold text-cyan-300">Mathematical Meaning</th>
                <th className="py-2.5 px-3 font-semibold text-emerald-300">Concrete Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-200">Perfect Multicollinearity</td>
                <td className="py-2.5 px-3 text-slate-300">One feature is an exact linear combination of others (<MathText text="$R^2 = 1.0$" />).</td>
                <td className="py-2.5 px-3 text-slate-400 font-mono"><MathText text="$\text{Total Income} = \text{Salary} + \text{Bonus}$" /></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-200">Near / Imperfect Multicollinearity</td>
                <td className="py-2.5 px-3 text-slate-300">Features are strongly linearly related but not identical.</td>
                <td className="py-2.5 px-3 text-slate-400 font-mono">Person's height (<MathText text="$x_1$" />) and weight (<MathText text="$x_2$" />)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-200">Structural Multicollinearity</td>
                <td className="py-2.5 px-3 text-slate-300">Created artificially during manual feature engineering.</td>
                <td className="py-2.5 px-3 text-slate-400 font-mono">Including <MathText text="$x$" /> and <MathText text="$x^2$" /> in polynomial regression</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-200">Data-Based Multicollinearity</td>
                <td className="py-2.5 px-3 text-slate-300">Inherent correlation naturally present in observed data.</td>
                <td className="py-2.5 px-3 text-slate-400 font-mono">Employee age and accumulated years of work experience</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Effects of Multicollinearity ───────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-amber-400">
          <ShieldAlert className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Pathological Effects of Multicollinearity</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-amber-400">1. Unstable Coefficients</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Adding or removing a few training samples can cause weights to drastically fluctuate or flip sign from positive to negative.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-amber-400">2. Destroyed Interpretability</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              It becomes impossible to interpret a coefficient as <em>“the effect of <MathText text="$x_1$" /> while holding <MathText text="$x_2$" /> constant,”</em> because <MathText text="$x_1$" /> and <MathText text="$x_2$" /> co-vary together.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-amber-400">3. Inflated Standard Errors</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Variance of estimated parameters explodes, leading to wide confidence intervals and insignificant $p$-values for truly important variables.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-amber-400">4. Fragile Out-of-Sample Predictions</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              If the historical correlation between <MathText text="$x_1$" /> and <MathText text="$x_2$" /> drifts in test data, model predictions destabilize.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 sm:col-span-2">
            <span className="font-bold text-amber-400">5. Canceling Overfitting Weights</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Models often learn massive offsetting weights (e.g. <MathText text="$+1000 x_1 - 998 x_2$" />) that cancel out during training but produce wild runaway errors in production.
            </p>
          </div>
        </div>
      </div>

      {/* ── Detecting Multicollinearity (Correlation & VIF) ───────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Activity className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Detecting Multicollinearity: Pearson $r$ and VIF</h3>
        </div>

        {/* Worked Pearson Correlation Calculation */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
          <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            Worked Pearson Correlation Calculation (<MathText text="$r_{xy}$" />)
          </h4>
          <p className="text-slate-300">
            Formula for sample linear correlation between two features <MathText text="$x$" /> and <MathText text="$y$" />:
          </p>
          <div className="p-2.5 bg-slate-900 rounded font-mono text-center text-cyan-300">
            <MathText text="$$r_{xy} = \frac{\sum (x - \bar{x})(y - \bar{y})}{\sqrt{\sum (x - \bar{x})^2 \sum (y - \bar{y})^2}}$$" displayMode={true} />
          </div>

          <p className="text-slate-400 text-[11px]">
            Given dataset: <MathText text="$x = [1, 2, 3, 4]$" /> and <MathText text="$y = [2, 3, 5, 6]$" />:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
            <div className="p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Mean x</span>
              <MathText text="$\bar{x} = 2.5$" />
            </div>
            <div className="p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Mean y</span>
              <MathText text="$\bar{y} = 4.0$" />
            </div>
            <div className="p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Numerator</span>
              <MathText text="$\sum = 7.0$" />
            </div>
            <div className="p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Sum Squares</span>
              <MathText text="$5 \times 10 = 50$" />
            </div>
          </div>

          <div className="p-2.5 bg-slate-900 rounded font-mono text-center text-emerald-300">
            <MathText text="$$r = \frac{7}{\sqrt{5 \cdot 10}} = \frac{7}{\sqrt{50}} \approx 0.99$$" displayMode={true} />
          </div>
          <p className="text-emerald-400 text-[11px] text-center font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 inline mr-1" />
            <MathText text="$r \approx 0.99$" /> indicates an almost perfect positive linear relationship!
          </p>
        </div>

        {/* Interactive VIF Explorer */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              Interactive Variance Inflation Factor (VIF) Calculator
            </div>
            <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold border ${vifStatus.color}`}>
              {vifStatus.label}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            To determine how much feature <MathText text="$x_j$" /> is inflated by all other predictors, fit an auxiliary regression predicting <MathText text="$x_j$" /> from all other features to obtain <MathText text="$R_j^2$" />:
          </p>

          <div className="p-2.5 bg-slate-900 rounded font-mono text-center text-cyan-300 text-xs">
            <MathText text="$$\text{VIF}_j = \frac{1}{1 - R_j^2}$$" displayMode={true} />
          </div>

          {/* Slider */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <label className="text-slate-200 font-semibold flex items-center gap-2">
                <span>Auxiliary Correlation (<MathText text="$R_j^2$" />):</span>
                <span className="font-mono text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {rSq.toFixed(2)}
                </span>
              </label>
              <span className="font-mono text-sm text-cyan-300">
                Calculated VIF = <strong className="text-base text-cyan-200">{vif.toFixed(1)}</strong>
              </span>
            </div>
            <input
              type="range"
              min="0.0"
              max="0.99"
              step="0.01"
              value={rSq}
              onChange={(e) => setRSq(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          {/* Canonical VIF Benchmark Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
              <thead className="bg-slate-900 text-slate-300 border-b border-slate-800">
                <tr>
                  <th className="py-2 px-3">R² Score</th>
                  <th className="py-2 px-3">VIF Calculation</th>
                  <th className="py-2 px-3">Diagnostic Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 bg-slate-950">
                <tr className={rSq === 0 ? 'bg-cyan-500/10' : ''}>
                  <td className="py-1.5 px-3">0.00</td>
                  <td className="py-1.5 px-3">1 / (1 - 0) = 1.0</td>
                  <td className="py-1.5 px-3 text-emerald-400 font-sans">Completely orthogonal features</td>
                </tr>
                <tr className={rSq >= 0.48 && rSq <= 0.52 ? 'bg-cyan-500/10' : ''}>
                  <td className="py-1.5 px-3">0.50</td>
                  <td className="py-1.5 px-3">1 / (1 - 0.5) = 2.0</td>
                  <td className="py-1.5 px-3 text-emerald-400 font-sans">Mild overlap, perfectly safe</td>
                </tr>
                <tr className={rSq >= 0.78 && rSq <= 0.82 ? 'bg-cyan-500/10' : ''}>
                  <td className="py-1.5 px-3">0.80</td>
                  <td className="py-1.5 px-3">1 / (1 - 0.8) = 5.0</td>
                  <td className="py-1.5 px-3 text-amber-400 font-sans">Moderate collinearity threshold</td>
                </tr>
                <tr className={rSq >= 0.88 && rSq <= 0.92 ? 'bg-cyan-500/10' : ''}>
                  <td className="py-1.5 px-3">0.90</td>
                  <td className="py-1.5 px-3">1 / (1 - 0.9) = 10.0</td>
                  <td className="py-1.5 px-3 text-rose-400 font-sans">Severe collinearity threshold</td>
                </tr>
                <tr className={rSq >= 0.98 ? 'bg-cyan-500/10' : ''}>
                  <td className="py-1.5 px-3">0.99</td>
                  <td className="py-1.5 px-3">1 / (1 - 0.99) = 100.0</td>
                  <td className="py-1.5 px-3 text-rose-400 font-bold font-sans">Pathologically redundant predictor</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Homoscedasticity vs. Heteroscedasticity ───────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <BarChart2 className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Homoscedasticity vs. Heteroscedasticity</h3>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setResidualType('homoscedastic')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                residualType === 'homoscedastic'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Homoscedasticity (Equal)
            </button>
            <button
              onClick={() => setResidualType('heteroscedastic')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                residualType === 'heteroscedastic'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Heteroscedasticity (Funnel)
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          A residual is the prediction error <MathText text="$$e_i = y_i - \hat{y}_i$$" />. Linear regression mathematically presumes that error variance remains constant across the entire input space (<MathText text="$\text{Var}(e \mid x) = \sigma^2$" />).
        </p>

        {residualType === 'homoscedastic' ? (
          <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-3 animate-fade-in text-xs">
            <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] block">
              Homoscedasticity: Constant Error Variance
            </span>
            <p className="text-slate-300">
              The spread of residuals is approximately equal for small, medium, and large values of feature <MathText text="$x$" />:
            </p>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-emerald-300 text-center">
              Residual errors: <MathText text="$-40, \; +30, \; -50, \; +45 \implies \text{Var}(e \mid x) = \text{constant}$" />
            </div>
            <p className="text-slate-400 text-[11px]">
              Standard errors and hypothesis tests remain fully reliable because the single shared variance assumption holds.
            </p>
          </div>
        ) : (
          <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30 space-y-3 animate-fade-in text-xs">
            <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px] block">
              Heteroscedasticity: Changing Error Variance
            </span>
            <p className="text-slate-300">
              The spread of residuals systematically expands or contracts across the input domain. Classic example: <strong>Grocery Spending predicted from Household Income</strong>:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border border-slate-800 rounded-lg overflow-hidden font-mono text-xs">
                <thead className="bg-slate-900 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="py-2 px-3">Income Bracket</th>
                    <th className="py-2 px-3">Observed Residual Errors</th>
                    <th className="py-2 px-3 font-sans">Spread Profile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70 bg-slate-950">
                  <tr>
                    <td className="py-2 px-3 text-cyan-300 font-sans">Low Income</td>
                    <td className="py-2 px-3 text-slate-300">−$10, +$20, +$10, −$20</td>
                    <td className="py-2 px-3 text-emerald-400 font-sans">Tight, narrow variance</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-amber-300 font-sans">High Income</td>
                    <td className="py-2 px-3 text-rose-300">−$200, +$450, −$500, +$700</td>
                    <td className="py-2 px-3 text-rose-400 font-sans">Massive funnel-shaped spread</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-amber-300/90 text-[11px] leading-relaxed">
              <strong>Failure Consequence:</strong> Because ordinary least squares assumes one uniform error variance, confidence intervals and significance tests become invalid.
              Decision trees natively handle this by partitioning low and high income into separate leaves with independent variance estimations!
            </p>
          </div>
        )}
      </div>

      {/* ── Part 9: Limitations of Logistic Regression ─────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-purple-400">
          <HelpCircle className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Foundational Limitations of Logistic Regression</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          While logistic regression squashes outputs via sigmoid, its underlying statistical engine remains fundamentally linear, imposing severe structural bottlenecks:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-purple-400 uppercase tracking-wider text-[11px]">1. Linear Log-Odds & Linear Boundary</span>
            <p className="text-slate-300 leading-relaxed">
              Logistic regression enforces linear log-odds: <MathText text="$\log\left(\frac{p}{1-p}\right) = \theta^T x + b$" />.
              With two features, the <MathText text="$p = 0.5$" /> decision boundary occurs at <MathText text="$\theta_0 + \theta_1 x_1 + \theta_2 x_2 = 0$" /> (a single straight line).
            </p>
            <div className="p-2 bg-slate-900 rounded font-mono text-center text-purple-300">
              Cannot separate concentric circles or XOR patterns without manual transformations!
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">3. High-Dimensional Breakdown & Overfitting</span>
            <p className="text-slate-300 leading-relaxed">
              When feature dimensions <MathText text="$p$" /> approach or exceed the sample count <MathText text="$N$" />, logistic regression suffers from catastrophic overfitting and numerical separation issues.
            </p>
            <div className="p-2 bg-slate-900 rounded font-mono text-center text-amber-300 text-[11px]">
              Parameter space explodes (<MathText text="$\theta \in \mathbb{R}^p$" />) requiring extensive regularizers (<MathText text="$L_1 / L_2$" />).
            </div>
            <p className="text-slate-400 text-[11px]">
              Distance-based classifiers (e.g., kNN) fail completely because pairwise distance in unit hypercubes grows as <MathText text="$\lim_{q \to \infty} d_q = \sqrt{q/6} \to \infty$" />, making all points equidistant.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-cyan-400 uppercase tracking-wider text-[11px]">4. Automated Greedy Feature Selection</span>
            <p className="text-slate-300 leading-relaxed">
              In stark contrast, a decision tree evaluates features one axis at a time. If 100 features are pure noise, the greedy split criterion simply never selects them!
            </p>
            <div className="p-2 bg-slate-900 rounded font-mono text-center text-cyan-300 text-[11px]">
              Trees implicitly perform embedded feature selection, ignoring uninformative dimensions.
            </div>
            <p className="text-slate-400 text-[11px]">
              This makes trees robust to redundant dimensions and unnormalized scale differences.
            </p>
          </div>
        </div>
      </div>

      {/* ── Final Module Recap Table ───────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Table className="w-4 h-4 text-emerald-400" />
          Final Module Synthesis: Why Decision Trees Emerge
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-semibold text-rose-400">Classical Model Limitation</th>
                <th className="py-2.5 px-3 font-semibold text-cyan-300">Why It Matters</th>
                <th className="py-2.5 px-3 font-semibold text-emerald-300">Decision-Tree Architectural Solution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-200">Nonlinear Relationships</td>
                <td className="py-2.5 px-3 text-slate-300">One global linear slope cannot fit multi-regime curves.</td>
                <td className="py-2.5 px-3 text-emerald-300">Carves space into piecewise constant step regions.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-200">Outlier Vulnerability</td>
                <td className="py-2.5 px-3 text-slate-300">Large squared errors drag the entire global slope.</td>
                <td className="py-2.5 px-3 text-emerald-300">Isolates atypical points into separate leaves without moving global rules.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-200">Multicollinearity</td>
                <td className="py-2.5 px-3 text-slate-300">Overlapping features explode coefficient variance and ruin interpretation.</td>
                <td className="py-2.5 px-3 text-emerald-300">Selects single best feature at each split; immune to matrix inversion singularity.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-200">Heteroscedasticity</td>
                <td className="py-2.5 px-3 text-slate-300">Changing error spread violates homoscedastic OLS assumptions.</td>
                <td className="py-2.5 px-3 text-emerald-300">Calculates localized variances independently inside each sub-partition.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-200">Linear Boundary Constraints</td>
                <td className="py-2.5 px-3 text-slate-300">Straight hyperplane cannot separate non-linear clusters.</td>
                <td className="py-2.5 px-3 text-emerald-300">Combines multiple axis-aligned cuts to box arbitrary complex regions.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-200 text-center font-medium">
          Linear & Logistic Assumptions <ArrowRight className="w-3.5 h-3.5 inline mx-1" /> Theoretical Bottlenecks <ArrowRight className="w-3.5 h-3.5 inline mx-1" /> Decision Trees as the Foundational Non-Parametric Solution
        </div>
      </div>
    </div>
  );
};
