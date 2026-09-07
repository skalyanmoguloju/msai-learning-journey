import React, { useState, useRef, useEffect, useMemo } from 'react';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import { MathText, setupCanvas } from '../../../../../common';

interface Module3RegressionLossProps {
  showToast?: (msg: string) => void;
}

export const Module3RegressionLoss: React.FC<Module3RegressionLossProps> = ({ showToast }) => {
  const [regPoints, setRegPoints] = useState<Array<{ x: number; y: number; pred: number }>>([
    { x: 1, y: 2.2, pred: 2.0 },
    { x: 2, y: 3.9, pred: 4.0 },
    { x: 3, y: 6.1, pred: 6.0 },
    { x: 4, y: 8.2, pred: 8.0 },
    { x: 5, y: 9.8, pred: 10.0 }
  ]);
  const regCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const regMetrics = useMemo(() => {
    let sumSq = 0;
    let sumAbs = 0;
    let sumY = 0;
    regPoints.forEach(p => {
      const err = p.y - p.pred;
      sumSq += err * err;
      sumAbs += Math.abs(err);
      sumY += p.y;
    });
    const n = regPoints.length;
    const mse = sumSq / n;
    const rmse = Math.sqrt(mse);
    const mae = sumAbs / n;
    const meanY = sumY / n;
    let ssTot = 0;
    regPoints.forEach(p => {
      ssTot += Math.pow(p.y - meanY, 2);
    });
    const r2 = 1 - (sumSq / (ssTot || 1));
    return { mse, rmse, mae, r2 };
  }, [regPoints]);

  useEffect(() => {
    const canvas = regCanvasRef.current;
    const res = setupCanvas(canvas, 500, 240);
    if (!canvas || !res) return;
    const { ctx, width: w, height: h } = res;

    const pad = 40;
    const chartW = w - pad * 2;
    const chartH = h - pad * 2;

    ctx.clearRect(0, 0, w, h);

    // Grid & Axes
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.stroke();

    const maxX = Math.max(7, ...regPoints.map(p => p.x + 1));
    const maxY = Math.max(15, ...regPoints.map(p => Math.max(p.y, p.pred) + 3));

    // Draw Line: Model Prediction
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    const px0 = pad + (0 / maxX) * chartW;
    const py0 = h - pad - (0 / maxY) * chartH;
    const pxMax = pad + (maxX / maxX) * chartW;
    const pyMax = h - pad - ((2.0 * maxX) / maxY) * chartH;
    ctx.moveTo(px0, py0);
    ctx.lineTo(pxMax, pyMax);
    ctx.stroke();

    // Draw Points & Residual Lines
    regPoints.forEach(p => {
      const px = pad + (p.x / maxX) * chartW;
      const py = h - pad - (p.y / maxY) * chartH;
      const predY = h - pad - (p.pred / maxY) * chartH;

      // Residual dashed line
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(px, predY);
      ctx.lineTo(px, py);
      ctx.stroke();
      ctx.setLineDash([]);

      // Point circle
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Legend
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('● Ground Truth (y)', pad + 10, pad + 15);
    ctx.fillStyle = '#818cf8';
    ctx.fillText('— Model Line (ŷ)', pad + 130, pad + 15);
  }, [regPoints]);

  return (
    <div className="space-y-6">
      {/* 4 Formula Cards with In-depth Definitions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
          <h4 className="font-bold text-sky-400 uppercase">1. Mean Squared Error (MSE)</h4>
          <div className="font-mono text-slate-200 text-sm">
            <MathText text="$\text{MSE} = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2$" />
          </div>
          <p className="text-slate-300">
            <strong>Definition:</strong> Calculates the average of squared differences (residuals) between predicted values (<MathText text="$\hat{y}_i$" />) and ground truth targets (<MathText text="$y_i$" />).
          </p>
          <p className="text-slate-400 text-[11px]">
            <strong>Key Characteristic:</strong> Heavy penalty on large outliers due to the squaring operation.
          </p>
        </div>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
          <h4 className="font-bold text-emerald-400 uppercase">2. Root Mean Squared Error (RMSE)</h4>
          <div className="font-mono text-slate-200 text-sm">
            <MathText text="$\text{RMSE} = \sqrt{\text{MSE}}$" />
          </div>
          <p className="text-slate-300">
            <strong>Definition:</strong> The square root of MSE, returning the error metric back to the original units of the target variable.
          </p>
          <p className="text-slate-400 text-[11px]">
            <strong>Key Characteristic:</strong> Easily interpretable in real-world business units (e.g. dollars, meters, degrees).
          </p>
        </div>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
          <h4 className="font-bold text-amber-400 uppercase">3. Mean Absolute Error (MAE)</h4>
          <div className="font-mono text-slate-200 text-sm">
            <MathText text="$\text{MAE} = \frac{1}{n} \sum_{i=1}^{n} |y_i - \hat{y}_i|$" />
          </div>
          <p className="text-slate-300">
            <strong>Definition:</strong> The average of absolute magnitude differences between predictions and actual values without regard to error direction.
          </p>
          <p className="text-slate-400 text-[11px]">
            <strong>Key Characteristic:</strong> Treats all errors linearly; highly robust against extreme dataset outliers.
          </p>
        </div>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
          <h4 className="font-bold text-purple-400 uppercase">4. Coefficient of Determination (<MathText text="$R^2$" />)</h4>
          <div className="font-mono text-slate-200 text-sm">
            <MathText text="$R^2 = 1 - \frac{\text{SS}_{\text{res}}}{\text{SS}_{\text{tot}}}$" />
          </div>
          <p className="text-slate-300">
            <strong>Definition:</strong> Measures the proportion of variance in the target variable (<MathText text="$y$" />) that is predictable from the input features (<MathText text="$X$" />).
          </p>
          <p className="text-slate-400 text-[11px]">
            <strong>Interpretation:</strong> 1.0 = Perfect Fit, 0.0 = Equivalent to Predicting Mean Baseline.
          </p>
        </div>
      </div>

      {/* Residual Definition Banner */}
      <div className="p-4 bg-slate-900 border border-sky-800/60 rounded-xl text-xs space-y-2">
        <span className="font-bold text-sky-300 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-sky-400" /> Definition: Residual (<MathText text="$e_i$" />)
        </span>
        <p className="text-slate-300">
          A <strong>residual</strong> is the vertical distance/difference between an observed actual value (<MathText text="$y_i$" />) and the model's predicted value (<MathText text="$\hat{y}_i$" />): <MathText text="$e_i = y_i - \hat{y}_i$" />. Analyzing residual scatter plots helps identify non-linear trends or unequal variance (heteroscedasticity).
        </p>
      </div>

      {/* Interactive Residual Scatter & Metric Playground */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <h3 className="font-bold text-sm text-sky-400 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Interactive Residual &amp; Outlier Error Simulator
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setRegPoints(prev => [...prev, { x: 6, y: 25.0, pred: 12.0 }]);
                showToast?.('Injected large outlier error! (x=6, y=25)');
              }}
              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition"
            >
              Inject Large Outlier Error
            </button>
            <button
              onClick={() => {
                setRegPoints([
                  { x: 1, y: 2.2, pred: 2.0 },
                  { x: 2, y: 3.9, pred: 4.0 },
                  { x: 3, y: 6.1, pred: 6.0 },
                  { x: 4, y: 8.2, pred: 8.0 },
                  { x: 5, y: 9.8, pred: 10.0 }
                ]);
                showToast?.('Reset data points.');
              }}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition"
            >
              Reset Data
            </button>
          </div>
        </div>

        <div className="w-full h-64 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden relative">
          <canvas ref={regCanvasRef} className="w-full h-full block" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center font-mono text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px]">MSE</span>
            <span className="text-sky-400 text-base font-bold">{regMetrics.mse.toFixed(2)}</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px]">RMSE</span>
            <span className="text-emerald-400 text-base font-bold">{regMetrics.rmse.toFixed(2)}</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px]">MAE</span>
            <span className="text-amber-400 text-base font-bold">{regMetrics.mae.toFixed(2)}</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px]">R² Score</span>
            <span className="text-purple-400 text-base font-bold">{regMetrics.r2.toFixed(3)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Module3RegressionLoss;
