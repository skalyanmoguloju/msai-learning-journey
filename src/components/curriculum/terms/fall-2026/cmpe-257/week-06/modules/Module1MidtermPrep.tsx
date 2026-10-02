import React from 'react';
import {
  FileText,
  Calendar,
  Clock,
  MapPin,
  Award,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Calculator,
  ShieldAlert,
  HelpCircle,
  Scale,
  Binary,
  Layers,
  Sparkles
} from 'lucide-react';

interface Module1MidtermPrepProps {
  onGoToDocuments?: () => void;
}

export const Module1MidtermPrep: React.FC<Module1MidtermPrepProps> = ({ onGoToDocuments }) => {
  return (
    <div className="space-y-8 animate-fade-in text-slate-200">
      {/* ── Notice Banner ────────────────────────────────────────── */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-amber-500/10 via-slate-900 to-indigo-950/40 border border-amber-500/30 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">
          <AlertCircle className="w-4 h-4" />
          <span>Notice — No Formal Lecture This Week</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          Week 06: Dedicated Midterm Examination Preparation
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          Week 6 has no lecture classes scheduled — it is dedicated entirely to synthesizing concepts from Weeks 1 through 5
          and working through the sample examination questions provided by Dr. Zara Hajihashemi.
        </p>
      </div>

      {/* ── Primary Callout: Go to Documents Action ─────────────── */}
      <div className="rounded-2xl p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 border border-indigo-500/40 shadow-xl space-y-4">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider font-mono">
              <Sparkles className="w-4 h-4" />
              <span>Recommended Study Flow</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Study the 10 Worked Exam Questions in the Documents Tab
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Dr. Zara Hajihashemi provided a comprehensive <strong>47-slide Midterm Exam Prep deck</strong> containing 10 multi-part
              computational, proof, and short-answer practice questions with complete solutions. In addition, the 
              <strong> Stanford CS229 Cheatsheet</strong> and the <strong>225-question interview guide</strong> are ready for you.
            </p>
          </div>
          {onGoToDocuments && (
            <button
              onClick={onGoToDocuments}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0 shrink-0"
            >
              <FileText className="w-4 h-4" />
              <span>Go to Documents Tab</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ── Midterm Exam Logistics & Rules ─────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-md space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" />
            Official Midterm Exam Information &amp; Regulations
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Confirmed exam parameters from the instructor's official briefing slide deck.
          </p>
        </div>

        {/* Logistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono uppercase">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Exam Date</span>
            </div>
            <div className="text-base font-bold text-white">Friday, October 2nd, 2026</div>
            <div className="text-[11px] text-slate-400">In-class examination session</div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono uppercase">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>Location</span>
            </div>
            <div className="text-base font-bold text-white">ENG 337</div>
            <div className="text-[11px] text-slate-400">Engineering Building, SJSU</div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono uppercase">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Duration</span>
            </div>
            <div className="text-base font-bold text-white">120 Minutes</div>
            <div className="text-[11px] text-slate-400">2 Full Hours allocation</div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono uppercase">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>Grade Weight</span>
            </div>
            <div className="text-base font-bold text-white">25% of Final Grade</div>
            <div className="text-[11px] text-slate-400">Major semester milestone</div>
          </div>
        </div>

        {/* Rules & Format Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Format */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-3">
            <h4 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              Exam Format Breakdown
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <span><strong>Multiple-Choice Questions (MCQs):</strong> Core theoretical nuances, bias-variance tradeoffs, generative vs discriminative models, and kernel properties.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <span><strong>Short Answer Explanations:</strong> Justifications for model choice, outlier sensitivity explanations, and mathematical proof concepts.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <span><strong>Computational Problems:</strong> Chi-square test contingency tables, decision tree entropy/Gini calculations, covariance matrices, and gradient descent update steps.</span>
              </li>
            </ul>
          </div>

          {/* Rules */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-3">
            <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Exam Integrity Rules
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span><strong>Permitted:</strong> One 8.5&times;11&Prime; page cheatsheet (both front &amp; back). Simple scientific calculator needed for computations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span><strong>Strictly Prohibited:</strong> No laptops, tablets, smart watches, or electronic devices of any kind.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span><strong>Zero-Tolerance AI Policy:</strong> Absolutely no brainstorming or querying with LLMs / GenAI tools.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Overview of the 10 Sample Exam Questions ───────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-cyan-400" />
              10 Sample Exam Questions in Documents
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Summary preview of the official practice questions with worked answers found in <code>CMPE257_MidTerm_Exam_Prep.pdf</code>.
            </p>
          </div>
          {onGoToDocuments && (
            <button
              onClick={onGoToDocuments}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition"
            >
              <span>View full deck</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-indigo-400 uppercase font-mono">Question 1: Short Concepts</span>
            <div className="font-semibold text-slate-200">True/False Concepts</div>
            <p className="text-slate-400 text-[11px]">
              Covers Naive Bayes infinite data error myth, multiclass logistic regression extensions (softmax/OvR), SVM margin definition, and linearity in log-odds.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-cyan-400 uppercase font-mono">Question 2: Classifier Selection</span>
            <div className="font-semibold text-slate-200">Diagonal Linear Datasets</div>
            <p className="text-slate-400 text-[11px]">
              Why SVM with a linear kernel cleanly separates diagonal clusters, while KNN with small $k$ can misclassify due to regional sample sparsity.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono">Question 3: Non-Linear Geometry</span>
            <div className="font-semibold text-slate-200">Concentric &amp; Circular Boundaries</div>
            <p className="text-slate-400 text-[11px]">
              Why linear classifiers fail on circular boundaries, and how Kernel SVM (polynomial or RBF) or feature expansion ($x_1^2 + x_2^2$) resolves it.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-amber-400 uppercase font-mono">Question 4: Outlier Robustness</span>
            <div className="font-semibold text-slate-200">Squared Loss vs. Hinge Loss</div>
            <p className="text-slate-400 text-[11px]">
              Adding distant outlier $(-5, 1)$: Squared loss $L_1 = \frac{1}{2}(\theta^T x - y)^2$ is severely pulled; Hinge loss $L_2 = \max(0, 1 - y\theta^T x)$ grows linearly and sacrifices the outlier.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-purple-400 uppercase font-mono">Question 5: Label Noise</span>
            <div className="font-semibold text-slate-200">Logistic Loss vs. Exponential Loss</div>
            <p className="text-slate-400 text-[11px]">
              With 10% corrupted labels, Logistic Loss generalizes far better than Exponential Loss because the linear penalty doesn't over-penalize mislabeled points.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-rose-400 uppercase font-mono">Question 6: Linear Algebra</span>
            <div className="font-semibold text-slate-200">Covariance Matrix for Correlated Features</div>
            <p className="text-slate-400 text-[11px]">
              Derives the scaled outer-product covariance matrix when columns are exact linear multiples (x&#8322; = 2x&#8321;, x&#8323; = 3x&#8321;).
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-teal-400 uppercase font-mono">Question 7: Hypothesis Testing</span>
            <div className="font-semibold text-slate-200">Chi-Square Test of Independence</div>
            <p className="text-slate-400 text-[11px]">
              Full computation on a 3 &times; 4 internet usage vs device type contingency table (N = 340): computes expected frequencies E_ij and test statistic &chi;&sup2; &approx; 33.28 &gt; 16.81 (df = 6, p &lt; 0.01).
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-blue-400 uppercase font-mono">Question 8: Generative Classifiers</span>
            <div className="font-semibold text-slate-200">Naive Bayes MLE on XOR Toy Dataset</div>
            <p className="text-slate-400 text-[11px]">
              Evaluates parameter estimation on 4 points (0,0):+, (1,1):+, (0,1):-, (1,0):-. All conditional probabilities equal 0.5, demonstrating why Naive Bayes cannot learn XOR.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-orange-400 uppercase font-mono">Question 9: Decision Trees</span>
            <div className="font-semibold text-slate-200">Impurity Measures Comparison</div>
            <p className="text-slate-400 text-[11px]">
              Computes Misclassification Error (0.40), Gini (0.48), and Shannon Entropy (0.971 bits) for 100 samples (60 A, 40 B). Shows why Gini and Entropy capture gradual split refinement.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-pink-400 uppercase font-mono">Question 10: Optimization</span>
            <div className="font-semibold text-slate-200">1D Linear Regression Batch Gradient Descent</div>
            <p className="text-slate-400 text-[11px]">
              For dataset D = [(1,2), (2,3), (3,5)] under MSE loss, computes initial error, gradient w.r.t w, and gradient w.r.t b at (w=0, b=0).
            </p>
          </div>
        </div>
      </div>

      {/* ── Document Reference Cards ───────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-mono">
          Available Documents in the Documents Tab
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold font-mono">
              <FileText className="w-4 h-4" />
              <span>47 Slides &bull; 1.5 MB</span>
            </div>
            <h4 className="font-bold text-white text-sm">CMPE 257 Midterm Prep Slides</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Dr. Zara Hajihashemi's official presentation with worked problems and answer keys.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold font-mono">
              <BookOpen className="w-4 h-4" />
              <span>4 Pages &bull; 656 KB</span>
            </div>
            <h4 className="font-bold text-white text-sm">CS229 Supervised Cheatsheet</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Stanford reference sheet by Afshine &amp; Shervine Amidi — ideal template for your 1-page exam cheatsheet.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono">
              <HelpCircle className="w-4 h-4" />
              <span>135 Pages &bull; 2.4 MB</span>
            </div>
            <h4 className="font-bold text-white text-sm">Cracking the ML Interview</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              225 questions and solutions covering the full breadth of classical machine learning theory.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
