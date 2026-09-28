import React, { useState } from 'react';
import {
  Compass,
  Users,
  Grid,
  Target,
  Scale,
  Cpu,
  Sliders,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Activity,
  Layers,
  HelpCircle
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module1InstanceBasedKNN: React.FC = () => {
  // ── Interactive 1: Weighted Neighbor Prediction (from Session 4 Module 1 HTML) ──
  const [wy1, setWy1] = useState<number>(10);
  const [ww1, setWw1] = useState<number>(0.8);
  const [wy2, setWy2] = useState<number>(20);
  const [ww2, setWw2] = useState<number>(0.3);
  const [wy3, setWy3] = useState<number>(30);
  const [ww3, setWw3] = useState<number>(0.1);

  const weightDenominator = ww1 + ww2 + ww3;
  const weightedNumerator = ww1 * wy1 + ww2 * wy2 + ww3 * wy3;
  const weightedPred = weightDenominator > 0 ? (weightedNumerator / weightDenominator).toFixed(3) : 'Invalid (Sum of weights is 0)';

  // ── Interactive 2: SOM BMU & Weight Update Simulator ─────────────────────────────
  const [somAlpha, setSomAlpha] = useState<number>(0.5);
  // Input x = (0.3, 0.5, 0.6)
  const inputX = [0.3, 0.5, 0.6];
  // Unit w_old = (0.2, 0.4, 0.7)
  const unitWOld = [0.2, 0.4, 0.7];
  const somDist = Math.sqrt(
    Math.pow(inputX[0] - unitWOld[0], 2) +
    Math.pow(inputX[1] - unitWOld[1], 2) +
    Math.pow(inputX[2] - unitWOld[2], 2)
  );
  const unitWNew = [
    unitWOld[0] + somAlpha * (inputX[0] - unitWOld[0]),
    unitWOld[1] + somAlpha * (inputX[1] - unitWOld[1]),
    unitWOld[2] + somAlpha * (inputX[2] - unitWOld[2])
  ];

  // ── Interactive 3: LVQ Prototype Classifier & Step ──────────────────────────────
  const [lvqQueryX, setLvqQueryX] = useState<number>(2.5);
  const [lvqQueryY, setLvqQueryY] = useState<number>(2.2);
  const [lvqAlpha, setLvqAlpha] = useState<number>(0.2);
  const [isCorrectClass, setIsCorrectClass] = useState<boolean>(true);

  // Prototype P1: (2, 2) Red
  // Prototype P2: (3, 1) Blue
  const p1 = { x: 2.0, y: 2.0, class: 'Red' };
  const p2 = { x: 3.0, y: 1.0, class: 'Blue' };

  const distP1 = Math.sqrt(Math.pow(lvqQueryX - p1.x, 2) + Math.pow(lvqQueryY - p1.y, 2));
  const distP2 = Math.sqrt(Math.pow(lvqQueryX - p2.x, 2) + Math.pow(lvqQueryY - p2.y, 2));
  const winningProto = distP1 <= distP2 ? p1 : p2;

  const lvqUpdatedX = isCorrectClass
    ? winningProto.x + lvqAlpha * (lvqQueryX - winningProto.x)
    : winningProto.x - lvqAlpha * (lvqQueryX - winningProto.x);
  const lvqUpdatedY = isCorrectClass
    ? winningProto.y + lvqAlpha * (lvqQueryY - winningProto.y)
    : winningProto.y - lvqAlpha * (lvqQueryY - winningProto.y);

  // ── Interactive 4: Bias-Variance in KNN ──────────────────────────────────────────
  const [kVal, setKVal] = useState<number>(3);
  const variancePct = Math.max(2, Math.round(48 / Math.sqrt(kVal)));
  const biasPct = Math.min(48, Math.round(4 + 1.3 * kVal));

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Module Roadmap ─────────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Compass className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Module Roadmap</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Explore memory-based non-parametric algorithms, spatial feature representations, topological maps, prototype learning, and case-based problem solving:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs pt-1">
          {[
            { num: 1, title: 'What Instance-Based Learning Means' },
            { num: 2, title: 'KNN as an Instance-Based Method' },
            { num: 3, title: 'Self-Organizing Maps (SOM)' },
            { num: 4, title: 'Learning Vector Quantization (LVQ)' },
            { num: 5, title: 'Locally Weighted Learning (LWL)' },
            { num: 6, title: 'Case-Based Reasoning (CBR)' }
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

      {/* ── What Is Instance-Based Learning? ───────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <HelpCircle className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">What Is Instance-Based Learning?</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          An <strong>instance</strong> is one observation or row in a dataset. <em>Instance-based learning</em> stores training instances and predicts outcomes for a new query example by comparing it directly with stored examples.
        </p>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-semibold text-amber-300">The Central Query Question</span>
          <p className="text-slate-200 font-medium italic text-sm">
            "Which known examples in our training history are most similar to this new observation?"
          </p>
          <p className="text-slate-400 leading-relaxed">
            This stands in stark contrast to global parametric models (e.g. Linear Regression <MathText text="$\hat{y} = \theta_0 + \theta_1 x_1 + \theta_2 x_2$" />), which attempt to estimate one single global equation that fits the entire dataset simultaneously. Instance-based learning is inherently <strong>local</strong>: different regions of the feature space construct distinct local approximations.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Lazy Learning Paradigm</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Instance-based algorithms are often termed <strong>lazy learners</strong> because they perform zero or minimal parameter estimation during the training phase. They simply memorize or index the data, deferring the computational heavy-lifting to inference time when an unseen query arrives.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 font-sans">
              <tr>
                <th className="py-2.5 px-3 text-cyan-300">Learning Stage</th>
                <th className="py-2.5 px-3 text-slate-300">What Happens Computationally?</th>
                <th className="py-2.5 px-3 text-emerald-300">Time Complexity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50 font-sans">
              <tr>
                <td className="py-2 px-3 font-semibold text-cyan-300">Training Phase</td>
                <td className="py-2 px-3 text-slate-300">Store raw feature vectors and their target labels into memory or spatial search indices.</td>
                <td className="py-2 px-3 text-emerald-300 font-mono"><MathText text="$\mathcal{O}(1)$" /> to <MathText text="$\mathcal{O}(N \log N)$" /></td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-amber-300">Prediction Phase</td>
                <td className="py-2 px-3 text-slate-300">Compute pairwise distances to find nearest neighbors, then vote or aggregate targets.</td>
                <td className="py-2 px-3 text-rose-300 font-mono"><MathText text="$\mathcal{O}(N d)$" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono text-xs text-cyan-300">
          <span className="text-slate-400 font-sans block mb-1">Core Inductive Bias:</span>
          <strong className="text-amber-300 text-sm">Similar inputs tend to produce similar outputs.</strong>
        </div>
      </div>

      {/* ── KNN as an Instance-Based Method ────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <Users className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">K-Nearest Neighbors (KNN)</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          K-Nearest Neighbors represents every observation as a point in <MathText text="$\mathbb{R}^d$" />. When a query point <MathText text="$x$" /> arrives, the algorithm calculates distance to every stored point and retrieves the <MathText text="$K$" /> closest neighbors.
        </p>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
          <span className="font-semibold text-cyan-300">Worked Step-by-Step Example: Student Exam Pass/Fail</span>
          <p className="text-slate-400">Consider five historical students measured on Study Hours (<MathText text="$x_1$" />) and Attendance (<MathText text="$x_2$" />):</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-lg overflow-hidden">
              <thead className="bg-slate-900 text-slate-300 border-b border-slate-800">
                <tr>
                  <th className="py-2 px-3">Student</th>
                  <th className="py-2 px-3">Study Hours (<MathText text="$x_1$" />)</th>
                  <th className="py-2 px-3">Attendance (<MathText text="$x_2$" />)</th>
                  <th className="py-2 px-3">Exam Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono bg-slate-950">
                <tr><td className="py-1.5 px-3 text-slate-400 font-sans">A</td><td className="py-1.5 px-3">2</td><td className="py-1.5 px-3">60%</td><td className="py-1.5 px-3 text-rose-400 font-sans font-semibold">Fail</td></tr>
                <tr><td className="py-1.5 px-3 text-slate-400 font-sans">B</td><td className="py-1.5 px-3">3</td><td className="py-1.5 px-3">65%</td><td className="py-1.5 px-3 text-rose-400 font-sans font-semibold">Fail</td></tr>
                <tr><td className="py-1.5 px-3 text-slate-400 font-sans">C</td><td className="py-1.5 px-3">7</td><td className="py-1.5 px-3">90%</td><td className="py-1.5 px-3 text-emerald-400 font-sans font-semibold">Pass</td></tr>
                <tr><td className="py-1.5 px-3 text-slate-400 font-sans">D</td><td className="py-1.5 px-3">8</td><td className="py-1.5 px-3">95%</td><td className="py-1.5 px-3 text-emerald-400 font-sans font-semibold">Pass</td></tr>
                <tr><td className="py-1.5 px-3 text-slate-400 font-sans">E</td><td className="py-1.5 px-3">6</td><td className="py-1.5 px-3">85%</td><td className="py-1.5 px-3 text-emerald-400 font-sans font-semibold">Pass</td></tr>
              </tbody>
            </table>
          </div>

          <p className="text-slate-300 leading-relaxed pt-1">
            Now suppose a new student arrives with <MathText text="$x = (6.5, 88)$" />. We compute the Euclidean distance to Student C <MathText text="$z_C = (7, 90)$" />:
          </p>

          <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-center text-cyan-300 text-xs">
            <MathText text="$$d(x, z_C) = \sqrt{(6.5 - 7)^2 + (88 - 90)^2} = \sqrt{(-0.5)^2 + (-2)^2} = \sqrt{0.25 + 4} = \sqrt{4.25} \approx 2.06$$" displayMode={true} />
          </div>

          <p className="text-slate-300 leading-relaxed">
            Evaluating distances to all students yields the top <MathText text="$K=3$" /> nearest neighbors: <strong>C, E, and D</strong>. Taking a majority vote:
          </p>

          <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-center text-emerald-300 text-xs">
            <MathText text="$$\text{Pass Votes} = 3, \quad \text{Fail Votes} = 0 \implies \mathbf{\widehat{Result} = Pass}$$" displayMode={true} />
          </div>

          <p className="text-slate-400 text-[11px]">
            For regression tasks, KNN computes the arithmetic mean of the <MathText text="$K$" /> numerical targets (<MathText text="$\hat{y} = \frac{1}{K}\sum_{i \in \mathcal{N}_K} y_i$" />) rather than performing a majority vote.
          </p>
        </div>
      </div>

      {/* ── Self-Organizing Maps (SOM) ─────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-400">
          <Grid className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Self-Organizing Maps (SOM)</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Developed by Teuvo Kohonen, a <strong>Self-Organizing Map (SOM)</strong> is an unsupervised neural network that maps high-dimensional continuous inputs onto a discrete, low-dimensional topological grid (typically 2D) while preserving the neighborhood topology.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-semibold text-emerald-300">1. Best Matching Unit (BMU) Selection</span>
            <p className="text-slate-300 leading-relaxed">
              Every map node <MathText text="$j$" /> maintains a weight vector <MathText text="$w_j \in \mathbb{R}^d$" />. Given input <MathText text="$x = (0.3, 0.5, 0.6)$" /> and node weight <MathText text="$w = (0.2, 0.4, 0.7)$" />:
            </p>
            <div className="bg-slate-900 p-2 rounded text-center text-cyan-300 font-mono text-xs">
              <MathText text="$$d = \sqrt{(0.3-0.2)^2 + (0.5-0.4)^2 + (0.6-0.7)^2} = \sqrt{0.03} \approx 0.173$$" displayMode={true} />
            </div>
            <p className="text-slate-400 text-[11px]">
              The node with minimum distance to <MathText text="$x$" /> is crowned the Best Matching Unit.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-semibold text-cyan-300">2. Weight Vector Attraction Update</span>
            <p className="text-slate-300 leading-relaxed">
              The BMU (and neighboring nodes within radius <MathText text="$\sigma$" />) are pulled toward the input vector:
            </p>
            <div className="bg-slate-900 p-2 rounded text-center text-emerald-300 font-mono text-xs">
              <MathText text="$$w_{\text{new}} = w_{\text{old}} + \alpha (x - w_{\text{old}})$$" displayMode={true} />
            </div>
            <p className="text-slate-400 text-[11px]">
              With learning rate <MathText text="$\alpha = 0.5$" />: <br />
              <MathText text="$w_{\text{new}} = (0.2, 0.4, 0.7) + 0.5(0.1, 0.1, -0.1) = \mathbf{(0.25, 0.45, 0.65)}$" />.
            </p>
          </div>
        </div>

        {/* Live SOM BMU Calculation Widget */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-200">Interactive: SOM Weight Adaptation</span>
            <span className="text-[11px] font-mono text-cyan-300">BMU Distance = {somDist.toFixed(4)}</span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-slate-400">
              <span>Attraction Rate (<MathText text="$\alpha$" />):</span>
              <span className="font-mono text-emerald-300 font-bold">{somAlpha.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="1.0"
              step="0.05"
              value={somAlpha}
              onChange={(e) => setSomAlpha(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 text-center font-mono">
            <div className="p-2 bg-slate-900 rounded-lg">
              <span className="text-[10px] text-slate-500 font-sans block">Input Vector x</span>
              <span className="text-cyan-300 text-xs">(0.3, 0.5, 0.6)</span>
            </div>
            <div className="p-2 bg-slate-900 rounded-lg">
              <span className="text-[10px] text-slate-500 font-sans block">Old Weight w</span>
              <span className="text-amber-300 text-xs">(0.2, 0.4, 0.7)</span>
            </div>
            <div className="p-2 bg-slate-900 rounded-lg border border-emerald-500/30">
              <span className="text-[10px] text-emerald-400 font-sans block">New Weight w*</span>
              <span className="text-emerald-300 text-xs">({unitWNew.map(v => v.toFixed(3)).join(', ')})</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Learning Vector Quantization (LVQ) ──────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-rose-400">
          <Target className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Learning Vector Quantization (LVQ)</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          While SOM is unsupervised, <strong>Learning Vector Quantization (LVQ)</strong> is a supervised prototype-based classification algorithm. Instead of storing all <MathText text="$N$" /> training points (like KNN), LVQ learns a small, highly compact set of class-labeled representative prototypes.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 font-sans">
              <tr>
                <th className="py-2 px-3 text-cyan-300">Prototype</th>
                <th className="py-2 px-3 text-slate-300">Spatial Coordinates</th>
                <th className="py-2 px-3 text-rose-300">Assigned Class Label</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr>
                <td className="py-2 px-3 font-semibold text-rose-400">P₁</td>
                <td className="py-2 px-3 text-slate-300">(2.0, 2.0)</td>
                <td className="py-2 px-3 text-rose-300 font-sans font-medium">Red</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-cyan-400">P₂</td>
                <td className="py-2 px-3 text-slate-300">(3.0, 1.0)</td>
                <td className="py-2 px-3 text-cyan-300 font-sans font-medium">Blue</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-semibold text-slate-200">Classification & The Directional Update Rule:</span>
          <p className="text-slate-300 leading-relaxed">
            For query point <MathText text="$x = (2.5, 2.2)$" />:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-center">
            <div className="p-2 bg-slate-900 rounded-lg text-rose-300">
              <MathText text="$$d(x, P_1) = \sqrt{(2.5-2)^2 + (2.2-2)^2} = \sqrt{0.29} \approx 0.538$$" displayMode={true} />
            </div>
            <div className="p-2 bg-slate-900 rounded-lg text-cyan-300">
              <MathText text="$$d(x, P_2) = \sqrt{(2.5-3)^2 + (2.2-1)^2} = \sqrt{1.69} = 1.300$$" displayMode={true} />
            </div>
          </div>
          <p className="text-slate-300 leading-relaxed pt-1">
            Since <MathText text="$P_1$" /> is closer, LVQ predicts <strong>Red</strong>. During training, the winning prototype updates according to classification correctness:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-lg">
              <span className="text-emerald-400 font-bold block mb-1">If Correct (Reward/Attract):</span>
              <div className="font-mono text-emerald-300 text-center">
                <MathText text="$$P_{\text{new}} = P_{\text{old}} + \alpha (x - P_{\text{old}})$$" displayMode={true} />
              </div>
              <span className="text-[11px] text-slate-400 block pt-1">Pulls the prototype closer to reinforce the correct classification.</span>
            </div>

            <div className="p-3 bg-rose-950/30 border border-rose-500/30 rounded-lg">
              <span className="text-rose-400 font-bold block mb-1">If Incorrect (Penalize/Repel):</span>
              <div className="font-mono text-rose-300 text-center">
                <MathText text="$$P_{\text{new}} = P_{\text{old}} - \alpha (x - P_{\text{old}})$$" displayMode={true} />
              </div>
              <span className="text-[11px] text-slate-400 block pt-1">Pushes the prototype away to clear space for the correct class boundary.</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Locally Weighted Learning (LWL) ────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-amber-400">
          <Scale className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Locally Weighted Learning</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Ordinary KNN gives equal influence to all <MathText text="$K$" /> chosen neighbors. <strong>Locally weighted learning</strong> gives closer neighbors proportionally greater influence on the final prediction:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 font-sans">
              <tr>
                <th className="py-2 px-3 text-cyan-300">Neighbor</th>
                <th className="py-2 px-3 text-slate-300">Target Value (<MathText text="$y_i$" />)</th>
                <th className="py-2 px-3 text-emerald-300">Assigned Proximity Weight (<MathText text="$w_i$" />)</th>
                <th className="py-2 px-3 text-amber-300">Product (<MathText text="$w_i y_i$" />)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr><td className="py-1.5 px-3 font-semibold text-slate-400 font-sans">A (Very Close)</td><td className="py-1.5 px-3">10</td><td className="py-1.5 px-3 text-emerald-300">0.8</td><td className="py-1.5 px-3 text-amber-300">8.0</td></tr>
              <tr><td className="py-1.5 px-3 font-semibold text-slate-400 font-sans">B (Medium)</td><td className="py-1.5 px-3">20</td><td className="py-1.5 px-3 text-emerald-300">0.3</td><td className="py-1.5 px-3 text-amber-300">6.0</td></tr>
              <tr><td className="py-1.5 px-3 font-semibold text-slate-400 font-sans">C (Distant)</td><td className="py-1.5 px-3">30</td><td className="py-1.5 px-3 text-emerald-300">0.1</td><td className="py-1.5 px-3 text-amber-300">3.0</td></tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-semibold text-amber-300">Normalized Weighted Average Formula:</span>
          <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-center text-cyan-300">
            <MathText text="$$\hat{y} = \frac{\sum_{i=1}^k w_i y_i}{\sum_{i=1}^k w_i} = \frac{0.8(10) + 0.3(20) + 0.1(30)}{0.8 + 0.3 + 0.1} = \frac{8 + 6 + 3}{1.2} = \frac{17}{1.2} \approx \mathbf{14.167}$$" displayMode={true} />
          </div>
          <p className="text-slate-400 text-[11px]">
            Notice that simple unweighted averaging would have produced <MathText text="$(10 + 20 + 30)/3 = 20.0$" />. Distance weighting pulls the estimate strongly toward neighbor A (<MathText text="$y=10$" />) because of its high weight (<MathText text="$w=0.8$" />).
          </p>
        </div>
      </div>

      {/* ── Interactive — Weighted Neighbor Prediction ─────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400">
            <Sliders className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Interactive — Weighted Neighbor Prediction</h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Live Calculator
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Change the target values (<MathText text="$y_i$" />) and proximity weights (<MathText text="$w_i$" />) to see how normalized weighted regression updates in real time:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
          {/* Neighbor 1 */}
          <div className="p-3 bg-slate-900/80 rounded-lg space-y-2 border border-slate-800">
            <span className="font-semibold text-emerald-400">Neighbor 1</span>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Target <MathText text="$y_1$" />:</span>
              <input
                type="number"
                value={wy1}
                onChange={(e) => setWy1(Number(e.target.value) || 0)}
                className="w-20 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-right font-mono text-cyan-300"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Weight <MathText text="$w_1$" />:</span>
              <input
                type="number"
                step="0.1"
                value={ww1}
                onChange={(e) => setWw1(Number(e.target.value) || 0)}
                className="w-20 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-right font-mono text-emerald-300"
              />
            </div>
          </div>

          {/* Neighbor 2 */}
          <div className="p-3 bg-slate-900/80 rounded-lg space-y-2 border border-slate-800">
            <span className="font-semibold text-cyan-400">Neighbor 2</span>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Target <MathText text="$y_2$" />:</span>
              <input
                type="number"
                value={wy2}
                onChange={(e) => setWy2(Number(e.target.value) || 0)}
                className="w-20 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-right font-mono text-cyan-300"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Weight <MathText text="$w_2$" />:</span>
              <input
                type="number"
                step="0.1"
                value={ww2}
                onChange={(e) => setWw2(Number(e.target.value) || 0)}
                className="w-20 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-right font-mono text-emerald-300"
              />
            </div>
          </div>

          {/* Neighbor 3 */}
          <div className="p-3 bg-slate-900/80 rounded-lg space-y-2 border border-slate-800">
            <span className="font-semibold text-purple-400">Neighbor 3</span>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Target <MathText text="$y_3$" />:</span>
              <input
                type="number"
                value={wy3}
                onChange={(e) => setWy3(Number(e.target.value) || 0)}
                className="w-20 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-right font-mono text-cyan-300"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Weight <MathText text="$w_3$" />:</span>
              <input
                type="number"
                step="0.1"
                value={ww3}
                onChange={(e) => setWw3(Number(e.target.value) || 0)}
                className="w-20 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-right font-mono text-emerald-300"
              />
            </div>
          </div>
        </div>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Numerator: <span className="font-mono text-cyan-300 font-bold">{weightedNumerator.toFixed(2)}</span> |
            Denominator: <span className="font-mono text-emerald-300 font-bold">{weightDenominator.toFixed(2)}</span>
          </div>
          <div className="text-sm font-bold font-mono text-amber-300">
            Weighted Prediction: <span className="text-cyan-400">{weightedPred}</span>
          </div>
        </div>
      </div>

      {/* ── Case-Based Reasoning (CBR) ─────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <Cpu className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Case-Based Reasoning (CBR)</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          <strong>Case-Based Reasoning (CBR)</strong> solves a novel problem by searching a library of historical problem-solution episodes, retrieving the most similar past case, and adapting its solution to the current context.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 font-sans">
              <tr>
                <th className="py-2 px-3 text-cyan-300">Case ID</th>
                <th className="py-2 px-3 text-slate-300">Observed Problem Symptoms</th>
                <th className="py-2 px-3 text-emerald-300">Stored Historical Resolution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50 font-sans">
              <tr>
                <td className="py-2 px-3 font-semibold text-slate-400 font-mono">Case 1</td>
                <td className="py-2 px-3 text-slate-300">Laptop does not turn on at all</td>
                <td className="py-2 px-3 text-emerald-300 font-medium">Check or replace battery / charging cable</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-slate-400 font-mono">Case 2</td>
                <td className="py-2 px-3 text-slate-300">Laptop powers on, fans spin, but screen remains black</td>
                <td className="py-2 px-3 text-emerald-300 font-medium">Reseat internal display cable or check GPU connection</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-slate-400 font-mono">Case 3</td>
                <td className="py-2 px-3 text-slate-300">Laptop shuts down abruptly after 15 minutes</td>
                <td className="py-2 px-3 text-emerald-300 font-medium">Clean clogged thermal heatsink and reapply thermal paste</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
          <span className="font-semibold text-cyan-300">The Classic Four-Step CBR Lifecycle</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {[
              {
                step: '1. Retrieve',
                desc: 'Search case library for past cases matching the current symptom features.',
                color: 'text-cyan-400',
                border: 'border-cyan-500/30'
              },
              {
                step: '2. Reuse',
                desc: 'Map the retrieved historical solution directly to the current situation.',
                color: 'text-emerald-400',
                border: 'border-emerald-500/30'
              },
              {
                step: '3. Revise',
                desc: 'Evaluate and adapt the solution if the new situation differs from the old case.',
                color: 'text-amber-400',
                border: 'border-amber-500/30'
              },
              {
                step: '4. Retain',
                desc: 'Store the newly verified problem-solution pair into the case library for future queries.',
                color: 'text-purple-400',
                border: 'border-purple-500/30'
              }
            ].map(c => (
              <div key={c.step} className={`p-3 bg-slate-900 rounded-lg border ${c.border} space-y-1`}>
                <span className={`font-bold ${c.color}`}>{c.step}</span>
                <p className="text-[11px] text-slate-300 leading-tight">{c.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-[11px] pt-1">
            <strong>Key Difference from KNN:</strong> KNN performs simple mathematical voting or averaging over scalar labels. Case-Based Reasoning handles complex, structured, non-numeric solutions and continuously learns through its <em>Retain</em> phase.
          </p>
        </div>
      </div>

      {/* ── Comparison of Instance-Based Methods ───────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Activity className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Comparison of Instance-Based Methods</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Master the computational and structural trade-offs among the five instance-based paradigms:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 font-sans">
              <tr>
                <th className="py-2.5 px-3 text-cyan-300">Method</th>
                <th className="py-2.5 px-3 text-amber-300">What It Stores or Learns</th>
                <th className="py-2.5 px-3 text-emerald-300">Main Output / Prediction</th>
                <th className="py-2.5 px-3 text-slate-300">Learning Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50 font-sans">
              <tr>
                <td className="py-2 px-3 font-semibold text-cyan-300">K-Nearest Neighbors (KNN)</td>
                <td className="py-2 px-3 text-slate-300">All raw training instances in memory</td>
                <td className="py-2 px-3 text-emerald-300 font-medium">Majority vote or target mean of <MathText text="$K$" /> neighbors</td>
                <td className="py-2 px-3 text-slate-400">Supervised</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-emerald-300">Self-Organizing Maps (SOM)</td>
                <td className="py-2 px-3 text-slate-300">Organized grid of node weight vectors</td>
                <td className="py-2 px-3 text-emerald-300 font-medium">Discovered topological map location (BMU)</td>
                <td className="py-2 px-3 text-slate-400">Unsupervised</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-rose-300">Learning Vector Quantization (LVQ)</td>
                <td className="py-2 px-3 text-slate-300">Class-labeled representative prototypes</td>
                <td className="py-2 px-3 text-emerald-300 font-medium">Class label of the nearest prototype</td>
                <td className="py-2 px-3 text-slate-400">Supervised</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-amber-300">Locally Weighted Learning (LWL)</td>
                <td className="py-2 px-3 text-slate-300">Stored instances plus distance-decaying weight functions</td>
                <td className="py-2 px-3 text-emerald-300 font-medium">Normalized weighted average or weighted vote</td>
                <td className="py-2 px-3 text-slate-400">Supervised</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-purple-300">Case-Based Reasoning (CBR)</td>
                <td className="py-2 px-3 text-slate-300">Episodic problem-solution case library</td>
                <td className="py-2 px-3 text-emerald-300 font-medium">Retrieved, adapted, and retained complete solution</td>
                <td className="py-2 px-3 text-slate-400">Knowledge-based</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
