import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  Maximize2,
  Minimize2,
  TrendingDown,
  RotateCcw,
  Play,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Sliders,
  Hash,
  Activity,
  ArrowRight,
  Info,
  BarChart2
} from 'lucide-react';
import { MathText } from '../../../../../common';

interface Point2D {
  name: string;
  x: number;
  y: number;
}

const SIX_POINTS: Point2D[] = [
  { name: 'A', x: 1, y: 1 },
  { name: 'B', x: 2, y: 2 },
  { name: 'C', x: 2, y: 1 },
  { name: 'D', x: 8, y: 8 },
  { name: 'E', x: 9, y: 8 },
  { name: 'F', x: 8, y: 9 }
];

export const Module6KMeansClustering: React.FC = () => {
  // Interactive 1: Lloyd 6-Point Step-by-Step State
  // Step 0: Initial Centroids mu1=(1,1), mu2=(8,8)
  // Step 1: Assignment Step (Cluster 1: A,B,C; Cluster 2: D,E,F) -> J = 5
  // Step 2: Centroid Update Step (mu1=(1.67, 1.33), mu2=(8.33, 8.33)) -> J = 2.67
  const [lloydStep, setLloydStep] = useState<number>(0);

  // Interactive 2: Elbow Method Explorer
  const [selectedK, setSelectedK] = useState<number>(2);
  const elbowData = [
    { k: 1, inertia: 184.3, note: 'Single grand centroid — massive dispersion' },
    { k: 2, inertia: 2.67, note: 'Optimal elbow! Sharpest drop in inertia' },
    { k: 3, inertia: 1.82, note: 'Marginal drop — splitting natural cluster' },
    { k: 4, inertia: 1.15, note: 'Diminishing returns — risk of overfitting' },
    { k: 5, inertia: 0.50, note: 'Near zero inertia, but clusters lose generalization' },
    { k: 6, inertia: 0.00, note: 'Trivial clustering: each point is its own centroid' }
  ];

  // Helper calculations for Interactive 1
  const centroidsStep0 = [
    { name: 'mu1', x: 1, y: 1, color: 'text-sky-400 bg-sky-500/20 border-sky-400' },
    { name: 'mu2', x: 8, y: 8, color: 'text-rose-400 bg-rose-500/20 border-rose-400' }
  ];
  const centroidsStep2 = [
    { name: 'mu1', x: 5 / 3, y: 4 / 3, color: 'text-sky-400 bg-sky-500/20 border-sky-400' },
    { name: 'mu2', x: 25 / 3, y: 25 / 3, color: 'text-rose-400 bg-rose-500/20 border-rose-400' }
  ];

  const currentCentroids = lloydStep === 2 ? centroidsStep2 : centroidsStep0;

  return (
    <div className="space-y-8 animate-fade-in text-slate-200">
      {/* ── 1. Unsupervised Learning Foundations ─────────────────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 text-cyan-400">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <Compass className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Unsupervised Learning Foundations</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          In supervised learning, every training observation is paired with an explicit ground-truth label <MathText text="$(x^{(i)}, y^{(i)})$" />, such as an email accompanied by a <code className="text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">Spam</code> or <code className="text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">Not spam</code> tag. In stark contrast, <strong>unsupervised learning</strong> operates exclusively on feature vectors with no target responses:
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-center text-cyan-300 text-sm">
          <MathText text="$$x^{(1)}, x^{(2)}, \dots, x^{(N)} \in \mathbb{R}^D$$" displayMode={true} />
          <span className="text-xs text-slate-400 font-sans block pt-1">
            Data points exist in feature space without supervisory guidance or predetermined ground truth.
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Consider an e-commerce platform tracking customer annual spending and annual purchase frequency. The raw database records numerical coordinates, but does not label users as <em>"Budget"</em>, <em>"Regular"</em>, or <em>"VIP"</em>. The goal of unsupervised learning is to discover intrinsic, latent geometric structures within the data.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
            <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Clustering
            </span>
            <p className="text-xs text-slate-400">
              Partitioning unlabeled observations into natural groupings of mutually similar items (e.g., K-Means).
            </p>
          </div>
          <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
            <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1.5">
              <Minimize2 className="w-3.5 h-3.5" /> Dimensionality Reduction
            </span>
            <p className="text-xs text-slate-400">
              Projecting high-dimensional spaces to lower dimensions while preserving variance or topology (e.g., PCA, t-SNE).
            </p>
          </div>
          <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
            <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" /> Density Estimation
            </span>
            <p className="text-xs text-slate-400">
              Estimating the underlying continuous probability density function <MathText text="$p(x)$" /> producing the data (e.g., GMMs).
            </p>
          </div>
          <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
            <span className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Anomaly Detection
            </span>
            <p className="text-xs text-slate-400">
              Identifying unusual observations residing far from established cluster centers or low-density regions.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. The Essence of Clustering ─────────────────────────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 text-indigo-400">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">The Essence of Clustering</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          A <strong>cluster</strong> is a collection of observations that are mutually similar to one another while being significantly different from observations belonging to other groups. Geometrically, an effective clustering exhibits two fundamental properties:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">1. High Intra-Cluster Compactness</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Points within the exact same cluster are concentrated close together, minimizing internal within-cluster spread.
            </p>
          </div>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">2. High Inter-Cluster Separation</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Distinct cluster centroids and their associated member manifolds are pushed far apart in feature space.
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-amber-300">1D Intuitive Example: Spending Patterns</span>
          <p className="text-xs text-slate-300">
            Consider six customer spending values in dollars:
          </p>
          <div className="font-mono text-center text-sm py-2 text-amber-200 bg-slate-900/80 rounded border border-slate-800">
            100,&nbsp;&nbsp;120,&nbsp;&nbsp;150,&nbsp;&nbsp;|&nbsp;&nbsp;1000,&nbsp;&nbsp;1100,&nbsp;&nbsp;1200
          </div>
          <p className="text-xs text-slate-400">
            Even without predefined category tags, human perception naturally isolates two dense clusters: a low-spending cluster centered near <MathText text="$\$123.33$" /> and a high-spending cluster centered near <MathText text="$\$1100.00$" />.
          </p>
        </div>

        <div className="p-4 bg-indigo-950/30 border border-indigo-800/40 rounded-xl space-y-2 text-xs">
          <div className="flex items-center gap-2 text-indigo-300 font-bold">
            <Info className="w-4 h-4" /> Crucial Distinction: Classification vs. Clustering
          </div>
          <p className="text-slate-300 leading-relaxed">
            <strong>Classification</strong> is supervised: it predicts predefined, human-assigned target classes. <strong>Clustering</strong> is unsupervised: it partitions data based strictly on geometric geometry without pre-existing labels. Cluster identifiers (<MathText text="$c=1, c=2$" />) are arbitrary numerical indices—Cluster 1 has no inherent semantic meaning until a human analyst interprets its properties.
          </p>
        </div>
      </section>

      {/* ── 3. Real-World Applications ──────────────────────────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 text-emerald-400">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Why Clustering is Useful</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-400 text-sm">Customer Segmentation</span>
            <p className="text-slate-300 leading-relaxed">
              Grouping corporate clients or retail buyers by order frequency, lifetime spending, and basket size. Clusters can be interpreted as <em>"Occasional bargain hunters"</em>, <em>"High-cadence corporate accounts"</em>, or <em>"Lapsed premium shoppers"</em> for targeted marketing.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-sky-400 text-sm">Document & Topic Organization</span>
            <p className="text-slate-300 leading-relaxed">
              Representing millions of news stories or support tickets via high-dimensional word frequency vectors (TF-IDF or embeddings) and clustering them into cohesive topic hierarchies (technology, geopolitics, sports, billing).
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-purple-400 text-sm">Image Compression (Color Quantization)</span>
            <p className="text-slate-300 leading-relaxed">
              Representing each image pixel by its RGB color vector <MathText text="$[R, G, B]^T$" />. By running K-Means with <MathText text="$K=16$" /> or <MathText text="$K=64$" />, millions of true colors are replaced by <MathText text="$K$" /> prototype palette centroids, drastically compressing file storage.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-rose-400 text-sm">Exploration & Anomaly Investigation</span>
            <p className="text-slate-300 leading-relaxed">
              Observations residing at extreme Euclidean distances from all learned cluster centroids often highlight rare fraudulent credit transactions, sensor malfunctions, or network intrusion attempts requiring priority audit.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. The K-Means Model & Centroid Representation ──────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 text-amber-400">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <Hash className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">The K-Means Model</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The parameter <MathText text="$K$" /> represents the exact number of clusters requested by the user. Each cluster <MathText text="$k \in \{1, \dots, K\}$" /> is represented by a prototype vector called a <strong>centroid</strong> <MathText text="$\mu_k$" />.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-amber-300">1D Centroid Example</span>
            <p className="text-slate-300">
              For points <MathText text="$1, 2, 3$" />, the centroid is the scalar arithmetic mean:
            </p>
            <div className="font-mono text-center p-2 rounded bg-slate-900 text-amber-200">
              <MathText text="$$\mu = \frac{1 + 2 + 3}{3} = 2$$" displayMode={true} />
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-amber-300">2D Centroid Example</span>
            <p className="text-slate-300">
              For 2D points <MathText text="$(1,2), (2,3), (3,4)$" />, average each feature coordinate independently:
            </p>
            <div className="font-mono text-center p-2 rounded bg-slate-900 text-amber-200">
              <MathText text="$$\mu = \begin{bmatrix} (1+2+3)/3 \\ (2+3+4)/3 \end{bmatrix} = \begin{bmatrix} 2 \\ 3 \end{bmatrix}$$" displayMode={true} />
            </div>
          </div>
        </div>

        <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs space-y-1.5 text-slate-300">
          <strong className="text-amber-300">Key Property:</strong> A centroid <MathText text="$\mu_k$" /> does not need to coincide with any actual observed training data point. It represents the idealized center of mass of the cluster.
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          K-Means solves the clustering problem by alternating iteratively between two complementary operations:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-950 rounded-xl border border-sky-900/50 space-y-2">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
              <span className="w-5 h-5 rounded-full bg-sky-500/20 flex items-center justify-center text-xs">1</span>
              Assignment Step
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Hold the centroids <MathText text="$\mu_k$" /> constant. Assign each observation <MathText text="$x^{(i)}$" /> to its closest centroid using squared Euclidean distance:
            </p>
            <div className="bg-slate-900 p-2 rounded text-center text-sky-300 font-mono text-xs">
              <MathText text="$$c^{(i)} \leftarrow \arg\min_k \|x^{(i)} - \mu_k\|^2$$" displayMode={true} />
            </div>
            <span className="text-[11px] text-slate-400 block">
              Note: Squared distance <MathText text="$\|x - \mu\|^2$" /> is used because monotonic square roots preserve distance rankings while avoiding unnecessary computation.
            </span>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-rose-900/50 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <span className="w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center text-xs">2</span>
              Update Step
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Hold the cluster assignments <MathText text="$c^{(i)}$" /> constant. Recompute each centroid <MathText text="$\mu_k$" /> as the mean of all data points currently assigned to it:
            </p>
            <div className="bg-slate-900 p-2 rounded text-center text-rose-300 font-mono text-xs">
              <MathText text="$$\mu_k \leftarrow \frac{1}{|C_k|} \sum_{i \in C_k} x^{(i)}$$" displayMode={true} />
            </div>
            <span className="text-[11px] text-slate-400 block">
              Where <MathText text="$C_k = \{i : c^{(i)} = k\}$" /> is the set of indices assigned to cluster <MathText text="$k$" />.
            </span>
          </div>
        </div>
      </section>

      {/* ── 5. Complete Worked Assignment Step ──────────────────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 text-sky-400">
          <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20">
            <Activity className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Step-by-Step Assignment Walkthrough</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Consider a dataset of six 2D observations with <MathText text="$K=2$" /> clusters:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs font-mono">
          <div className="p-2 rounded bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Point A</span>
            <span className="text-cyan-300 font-bold">(1, 1)</span>
          </div>
          <div className="p-2 rounded bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Point B</span>
            <span className="text-cyan-300 font-bold">(2, 2)</span>
          </div>
          <div className="p-2 rounded bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Point C</span>
            <span className="text-cyan-300 font-bold">(2, 1)</span>
          </div>
          <div className="p-2 rounded bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Point D</span>
            <span className="text-rose-300 font-bold">(8, 8)</span>
          </div>
          <div className="p-2 rounded bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Point E</span>
            <span className="text-rose-300 font-bold">(9, 8)</span>
          </div>
          <div className="p-2 rounded bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Point F</span>
            <span className="text-rose-300 font-bold">(8, 9)</span>
          </div>
        </div>

        <p className="text-sm text-slate-300">
          Assume initial centroid placements at:
        </p>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-sm text-slate-200">
          <MathText text="$$\mu_1 = (1, 1), \qquad \mu_2 = (8, 8)$$" displayMode={true} />
        </div>

        <div className="space-y-2 text-xs">
          <span className="font-bold text-slate-300">Point-by-Point Squared Distance Calculations:</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 font-mono">
              <span className="text-sky-300 font-bold block">Point A (1, 1):</span>
              <div><MathText text="$d^2(A, \mu_1) = (1-1)^2 + (1-1)^2 = \mathbf{0}$" /></div>
              <div><MathText text="$d^2(A, \mu_2) = (1-8)^2 + (1-8)^2 = 49 + 49 = \mathbf{98}$" /></div>
              <span className="text-emerald-400 text-[11px] block pt-1 font-sans">0 &lt; 98 &rarr; Assigned to Cluster 1</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 font-mono">
              <span className="text-sky-300 font-bold block">Point B (2, 2):</span>
              <div><MathText text="$d^2(B, \mu_1) = (2-1)^2 + (2-1)^2 = 1 + 1 = \mathbf{2}$" /></div>
              <div><MathText text="$d^2(B, \mu_2) = (2-8)^2 + (2-8)^2 = 36 + 36 = \mathbf{72}$" /></div>
              <span className="text-emerald-400 text-[11px] block pt-1 font-sans">2 &lt; 72 &rarr; Assigned to Cluster 1</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 font-mono">
              <span className="text-sky-300 font-bold block">Point C (2, 1):</span>
              <div><MathText text="$d^2(C, \mu_1) = (2-1)^2 + (1-1)^2 = 1 + 0 = \mathbf{1}$" /></div>
              <div><MathText text="$d^2(C, \mu_2) = (2-8)^2 + (1-8)^2 = 36 + 49 = \mathbf{85}$" /></div>
              <span className="text-emerald-400 text-[11px] block pt-1 font-sans">1 &lt; 85 &rarr; Assigned to Cluster 1</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 font-mono">
              <span className="text-rose-300 font-bold block">Point D (8, 8):</span>
              <div><MathText text="$d^2(D, \mu_1) = (8-1)^2 + (8-1)^2 = 49 + 49 = \mathbf{98}$" /></div>
              <div><MathText text="$d^2(D, \mu_2) = (8-8)^2 + (8-8)^2 = 0 + 0 = \mathbf{0}$" /></div>
              <span className="text-emerald-400 text-[11px] block pt-1 font-sans">0 &lt; 98 &rarr; Assigned to Cluster 2</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 font-mono">
              <span className="text-rose-300 font-bold block">Point E (9, 8):</span>
              <div><MathText text="$d^2(E, \mu_1) = (9-1)^2 + (8-1)^2 = 64 + 49 = \mathbf{113}$" /></div>
              <div><MathText text="$d^2(E, \mu_2) = (9-8)^2 + (8-8)^2 = 1 + 0 = \mathbf{1}$" /></div>
              <span className="text-emerald-400 text-[11px] block pt-1 font-sans">1 &lt; 113 &rarr; Assigned to Cluster 2</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 font-mono">
              <span className="text-rose-300 font-bold block">Point F (8, 9):</span>
              <div><MathText text="$d^2(F, \mu_1) = (8-1)^2 + (9-1)^2 = 49 + 64 = \mathbf{113}$" /></div>
              <div><MathText text="$d^2(F, \mu_2) = (8-8)^2 + (9-8)^2 = 0 + 1 = \mathbf{1}$" /></div>
              <span className="text-emerald-400 text-[11px] block pt-1 font-sans">1 &lt; 113 &rarr; Assigned to Cluster 2</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950">
                <th className="p-2.5">Point</th>
                <th className="p-2.5">Coordinates</th>
                <th className="p-2.5">Distance Squared to <MathText text="$\mu_1$" /></th>
                <th className="p-2.5">Distance Squared to <MathText text="$\mu_2$" /></th>
                <th className="p-2.5">Final Assignment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              <tr className="hover:bg-slate-800/30">
                <td className="p-2.5 text-cyan-300 font-bold">A</td>
                <td className="p-2.5">(1, 1)</td>
                <td className="p-2.5 text-emerald-400 font-bold">0</td>
                <td className="p-2.5 text-slate-400">98</td>
                <td className="p-2.5"><span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-sans">Cluster 1</span></td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-2.5 text-cyan-300 font-bold">B</td>
                <td className="p-2.5">(2, 2)</td>
                <td className="p-2.5 text-emerald-400 font-bold">2</td>
                <td className="p-2.5 text-slate-400">72</td>
                <td className="p-2.5"><span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-sans">Cluster 1</span></td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-2.5 text-cyan-300 font-bold">C</td>
                <td className="p-2.5">(2, 1)</td>
                <td className="p-2.5 text-emerald-400 font-bold">1</td>
                <td className="p-2.5 text-slate-400">85</td>
                <td className="p-2.5"><span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-sans">Cluster 1</span></td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-2.5 text-rose-300 font-bold">D</td>
                <td className="p-2.5">(8, 8)</td>
                <td className="p-2.5 text-slate-400">98</td>
                <td className="p-2.5 text-emerald-400 font-bold">0</td>
                <td className="p-2.5"><span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-sans">Cluster 2</span></td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-2.5 text-rose-300 font-bold">E</td>
                <td className="p-2.5">(9, 8)</td>
                <td className="p-2.5 text-slate-400">113</td>
                <td className="p-2.5 text-emerald-400 font-bold">1</td>
                <td className="p-2.5"><span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-sans">Cluster 2</span></td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-2.5 text-rose-300 font-bold">F</td>
                <td className="p-2.5">(8, 9)</td>
                <td className="p-2.5 text-slate-400">113</td>
                <td className="p-2.5 text-emerald-400 font-bold">1</td>
                <td className="p-2.5"><span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-sans">Cluster 2</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl text-xs text-emerald-300 font-mono">
          Resulting Partitions: Cluster 1 = &#123;A, B, C&#125;, Cluster 2 = &#123;D, E, F&#125;.
        </div>
      </section>

      {/* ── 6. Complete Worked Centroid Update Step ─────────────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 text-rose-400">
          <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">
            <Sliders className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Step-by-Step Centroid Update Walkthrough</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Now that point assignments are fixed, K-Means shifts each centroid to the exact empirical center of mass of its assigned member set:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-xl border border-sky-900/50 space-y-2">
            <span className="font-bold text-sky-400 text-sm">Cluster 1 Update: Points &#123;A, B, C&#125;</span>
            <p className="text-slate-300">
              Coordinates: <MathText text="$A(1,1), B(2,2), C(2,1)$" />
            </p>
            <div className="space-y-1 font-mono text-sky-200 bg-slate-900/80 p-2.5 rounded border border-slate-800">
              <div><MathText text="$\bar{x}_1 = \frac{1 + 2 + 2}{3} = \frac{5}{3} \approx 1.667$" /></div>
              <div><MathText text="$\bar{x}_2 = \frac{1 + 2 + 1}{3} = \frac{4}{3} \approx 1.333$" /></div>
            </div>
            <div className="text-sky-300 font-mono font-bold pt-1">
              <MathText text="$$\mu_1^{\text{new}} = \left(\frac{5}{3}, \frac{4}{3}\right) \approx (1.667, 1.333)$$" displayMode={true} />
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-rose-900/50 space-y-2">
            <span className="font-bold text-rose-400 text-sm">Cluster 2 Update: Points &#123;D, E, F&#125;</span>
            <p className="text-slate-300">
              Coordinates: <MathText text="$D(8,8), E(9,8), F(8,9)$" />
            </p>
            <div className="space-y-1 font-mono text-rose-200 bg-slate-900/80 p-2.5 rounded border border-slate-800">
              <div><MathText text="$\bar{x}_1 = \frac{8 + 9 + 8}{3} = \frac{25}{3} \approx 8.333$" /></div>
              <div><MathText text="$\bar{x}_2 = \frac{8 + 8 + 9}{3} = \frac{25}{3} \approx 8.333$" /></div>
            </div>
            <div className="text-rose-300 font-mono font-bold pt-1">
              <MathText text="$$\mu_2^{\text{new}} = \left(\frac{25}{3}, \frac{25}{3}\right) \approx (8.333, 8.333)$$" displayMode={true} />
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Both centroids have shifted inward towards their cluster cores. In the subsequent iteration, K-Means evaluates point distances relative to these updated coordinates.
        </p>
      </section>

      {/* ── 7. The Objective Function (Inertia / Distortion) ─────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 text-cyan-400">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <TrendingDown className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">The Objective Function (Inertia)</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          K-Means formally minimizes the <strong>distortion</strong> (or within-cluster sum of squares, WCSS), denoted by <MathText text="$J$" />:
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-center text-cyan-300 text-sm">
          <MathText text="$$J = \sum_{i=1}^N \|x^{(i)} - \mu_{c^{(i)}}\|^2$$" displayMode={true} />
          <span className="text-xs text-slate-400 font-sans block pt-1">
            Measures the cumulative squared Euclidean distance from every point to its assigned centroid.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-slate-300 text-sm">Initial Objective (Before Update)</span>
            <p className="text-slate-400">
              Sum of assigned squared distances with <MathText text="$\mu_1=(1,1)$" /> and <MathText text="$\mu_2=(8,8)$" />:
            </p>
            <div className="font-mono text-cyan-200 bg-slate-900/80 p-2.5 rounded border border-slate-800">
              <MathText text="$$J_{\text{initial}} = 0 + 2 + 1 + 0 + 1 + 1 = \mathbf{5.000}$$" displayMode={true} />
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-300 text-sm">Updated Objective (After Centroid Shift)</span>
            <p className="text-slate-400">
              Evaluating distances to <MathText text="$\mu_1^{\text{new}}=(5/3, 4/3)$" /> and <MathText text="$\mu_2^{\text{new}}=(25/3, 25/3)$" />:
            </p>
            <div className="font-mono text-emerald-300 bg-slate-900/80 p-2.5 rounded border border-slate-800 space-y-1">
              <div><MathText text="$J_1 = d^2(A) + d^2(B) + d^2(C) = \frac{5}{9} + \frac{5}{9} + \frac{2}{9} = \frac{12}{9} \approx 1.333$" /></div>
              <div><MathText text="$J_2 = d^2(D) + d^2(E) + d^2(F) = \frac{2}{9} + \frac{5}{9} + \frac{5}{9} = \frac{12}{9} \approx 1.333$" /></div>
              <div className="font-bold pt-1 border-t border-slate-800"><MathText text="$$J_{\text{new}} = J_1 + J_2 = 1.333 + 1.333 \approx \mathbf{2.667}$$" displayMode={true} /></div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>
            <strong>Strict Monotonic Improvement:</strong> The objective function decreased dramatically from <strong>5.000</strong> to <strong>2.667</strong>, proving mathematically that moving the centroids to the cluster averages produces more compact, optimal clusters!
          </span>
        </div>
      </section>

      {/* ── Interactive 1: Step-by-Step 6-Point K-Means Visualizer ──── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-cyan-400">
            <Play className="w-5 h-5" />
            <h2 className="text-xl font-bold text-slate-100">Interactive: 6-Point Lloyd Descent Visualizer</h2>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
            {lloydStep === 0 && 'Step 0: Initial Centroids'}
            {lloydStep === 1 && 'Step 1: Point Assignment (J = 5.00)'}
            {lloydStep === 2 && 'Step 2: Centroid Update (J = 2.67 - Converged!)'}
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Step through the exact 6-point numerical example to visually witness point assignments and centroid repositioning on a 2D Cartesian plane:
        </p>

        {/* Visual 2D Canvas */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <div className="relative w-full h-64 sm:h-80 bg-slate-900/60 rounded-lg border border-slate-800/80 p-2 overflow-hidden">
            {/* Coordinate Grid lines */}
            <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none opacity-20">
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="border-b border-r border-slate-700" />
              ))}
            </div>

            {/* Axis labels */}
            <div className="absolute bottom-1 left-2 text-[10px] text-slate-500 font-mono">x1 &rarr;</div>
            <div className="absolute top-2 left-2 text-[10px] text-slate-500 font-mono">&uarr; x2</div>

            {/* Data Points */}
            {SIX_POINTS.map((pt) => {
              // Map x: 0-10 -> 5%-95%, y: 0-10 -> 95%-5% (inverted for screen)
              const leftPercent = 5 + (pt.x / 10) * 88;
              const topPercent = 95 - (pt.y / 10) * 88;
              const isCluster1 = lloydStep > 0 && ['A', 'B', 'C'].includes(pt.name);
              const isCluster2 = lloydStep > 0 && ['D', 'E', 'F'].includes(pt.name);

              return (
                <div
                  key={pt.name}
                  style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-mono transition-all duration-500 shadow-md ${
                    isCluster1
                      ? 'bg-sky-500 text-slate-950 ring-2 ring-sky-300'
                      : isCluster2
                      ? 'bg-rose-500 text-white ring-2 ring-rose-300'
                      : 'bg-slate-700 text-slate-200 border border-slate-500'
                  }`}
                >
                  {pt.name}
                </div>
              );
            })}

            {/* Centroids */}
            {currentCentroids.map((c, idx) => {
              const leftPercent = 5 + (c.x / 10) * 88;
              const topPercent = 95 - (c.y / 10) * 88;
              return (
                <div
                  key={c.name}
                  style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded border text-[11px] font-bold font-mono transition-all duration-700 shadow-lg ${
                    idx === 0
                      ? 'bg-sky-400 text-slate-950 border-sky-200 ring-4 ring-sky-500/30'
                      : 'bg-rose-400 text-slate-950 border-rose-200 ring-4 ring-rose-500/30'
                  }`}
                >
                  &mu;{idx + 1} ({c.x.toFixed(2)}, {c.y.toFixed(2)})
                </div>
              );
            })}
          </div>

          {/* Stepper Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLloydStep((prev) => Math.min(prev + 1, 2))}
                disabled={lloydStep >= 2}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium disabled:opacity-40 transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5" /> Next Step
              </button>
              <button
                onClick={() => setLloydStep(0)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Demo
              </button>
            </div>

            <div className="font-mono text-xs text-slate-300">
              Current Inertia <MathText text="$J$" />:{' '}
              <span className="font-bold text-cyan-300">
                {lloydStep === 0 && 'Unassigned'}
                {lloydStep === 1 && '5.000'}
                {lloydStep === 2 && '2.667 (-46.7% drop)'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Convergence, Initialization, and Limitations ─────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 text-amber-400">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Convergence, Initialization, and Limitations</h2>
        </div>

        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <h3 className="text-sm font-bold text-amber-300">1. Why K-Means is Guaranteed to Converge</h3>
          <p>
            K-Means is an exact coordinate descent algorithm on <MathText text="$J(c, \mu)$" />:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-400">
            <li>
              <strong>Assignment Step:</strong> Each point <MathText text="$x^{(i)}$" /> greedily picks its closest centroid, ensuring <MathText text="$J$" /> cannot increase.
            </li>
            <li>
              <strong>Update Step:</strong> The sample arithmetic mean uniquely minimizes the sum of squared distances within any fixed cluster, guaranteeing <MathText text="$J$" /> strictly decreases or stays identical.
            </li>
            <li>
              Because there are only a finite number (<MathText text="$K^N$" />) of possible cluster assignments, the algorithm cannot loop infinitely and must converge in a finite number of iterations.
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-rose-400 text-sm">The Local Minima Trap</span>
            <p className="text-slate-300 leading-relaxed">
              While K-Means is guaranteed to terminate, it converges only to a <strong>local minimum</strong>, not necessarily the global optimum. Unlucky initial centroid locations can split single natural clusters or merge distinct clusters permanently.
            </p>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
              <strong className="text-cyan-300">Solution 1 — Random Restarts:</strong> Run K-Means 50–100 times with different random seeds; select the run achieving the lowest final objective <MathText text="$J$" />.
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
              <strong className="text-indigo-300">Solution 2 — K-Means++ Seeding:</strong> Probabilistically spread initial centroids proportional to squared distance <MathText text="$P(x) \propto D(x)^2$" /> from already chosen centroids.
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-amber-400 text-sm">Inherent Structural Limitations</span>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300 leading-relaxed">
              <li>
                <strong>Spherical / Equal-Variance Assumption:</strong> Standard Euclidean distance assumes clusters are isotropic (round/spherical) and of roughly equal spread.
              </li>
              <li>
                <strong>Manifold Failures:</strong> Struggles severely with concentric rings, interlocked crescents, elongated ellipsoids, or varying cluster densities.
              </li>
              <li>
                <strong>Feature Scale Sensitivity:</strong> If feature 1 has range <MathText text="$[0, 1000]$" /> and feature 2 has range <MathText text="$[0, 1]$" />, feature 1 completely dominates distance. Z-score standardization is mandatory.
              </li>
              <li>
                <strong>Outlier Vulnerability:</strong> Squaring Euclidean errors means extreme outliers yank centroids far away from the true cluster bodies.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Interactive 2: Elbow Method & Choosing K ─────────────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3 text-emerald-400">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <BarChart2 className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-100">Choosing K: The Elbow Method</h2>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
            Selected K = {selectedK}
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          How do we choose the optimal number of clusters <MathText text="$K$" />? As <MathText text="$K$" /> increases, <MathText text="$J$" /> monotonically decreases until <MathText text="$K=N$" /> where <MathText text="$J=0$" /> (trivial memorization). The <strong>Elbow Method</strong> looks for the inflection point where additional clusters yield diminishing returns:
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 text-xs">
            <label className="text-slate-400 font-medium">Select Number of Clusters (K):</label>
            <input
              type="range"
              min="1"
              max="6"
              value={selectedK}
              onChange={(e) => setSelectedK(parseInt(e.target.value))}
              className="w-48 accent-emerald-500 cursor-pointer"
            />
            <span className="font-mono text-emerald-400 font-bold text-sm">{selectedK}</span>
          </div>

          {/* Inertia Bar Progression */}
          <div className="flex items-end gap-2 sm:gap-4 h-32 pt-4 px-2 border-b border-slate-800">
            {elbowData.map((d) => {
              const heightPercent = Math.max(8, (d.inertia / elbowData[0].inertia) * 100);
              const isSelected = d.k === selectedK;
              const isElbow = d.k === 2;
              return (
                <div key={d.k} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className="text-[10px] font-mono text-slate-400">
                    {d.inertia.toFixed(1)}
                  </span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t transition-all duration-300 relative ${
                      isSelected
                        ? 'bg-emerald-400 ring-2 ring-emerald-300 shadow-lg shadow-emerald-500/20'
                        : isElbow
                        ? 'bg-cyan-500/80'
                        : 'bg-slate-700/80 hover:bg-slate-600'
                    }`}
                  >
                    {isElbow && (
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-cyan-300 uppercase tracking-tighter whitespace-nowrap">
                        Elbow
                      </span>
                    )}
                  </div>
                  <span className={`text-xs font-mono font-bold ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`}>
                    K={d.k}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs flex items-center justify-between">
            <span className="text-slate-300">
              Analysis for <strong className="text-emerald-400">K = {selectedK}</strong>: {elbowData[selectedK - 1].note}
            </span>
            <span className="font-mono text-emerald-300 font-bold">
              WCSS: {elbowData[selectedK - 1].inertia}
            </span>
          </div>
        </div>
      </section>

      {/* ── 9. Final Algorithm Recap ─────────────────────────────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Complete Algorithm Recap
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="font-mono text-cyan-400 font-bold block">1. Initialize</span>
            <p className="text-slate-400">
              Pick <MathText text="$K$" /> initial centroids using K-Means++ or multiple random restarts.
            </p>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="font-mono text-sky-400 font-bold block">2. Assign</span>
            <p className="text-slate-400">
              Assign each point <MathText text="$x^{(i)}$" /> to its nearest centroid via squared distance.
            </p>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="font-mono text-rose-400 font-bold block">3. Update</span>
            <p className="text-slate-400">
              Shift each centroid to the coordinate average of its newly assigned points.
            </p>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="font-mono text-emerald-400 font-bold block">4. Iterate</span>
            <p className="text-slate-400">
              Repeat Assignment and Update until assignments freeze or objective drop <MathText text="$< \epsilon$" />.
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-center text-slate-300 font-mono">
          <span className="text-cyan-400 font-bold">Core Execution Loop:</span> Choose K &rarr; Initialize Centroids &rarr; Assign Points &rarr; Update Centroids &rarr; Measure Inertia &rarr; Converge.
        </div>
      </section>
    </div>
  );
};
