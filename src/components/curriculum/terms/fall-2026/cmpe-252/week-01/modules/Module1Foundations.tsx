import React, { useState } from 'react';
import { Book, BrainCircuit, Cpu, Layers, GitCompare, Split, HelpCircle } from 'lucide-react';
import { MathText } from '../../../../../common';
import { PARADIGM_QUESTIONS } from '../types';

interface Module1FoundationsProps {
  showToast?: (msg: string) => void;
}

export const Module1Foundations: React.FC<Module1FoundationsProps> = ({ showToast }) => {
  const [paradigmIdx, setParadigmIdx] = useState(0);
  const [paradigmScore, setParadigmScore] = useState(0);

  const handleChoice = (choice: string) => {
    const currentQ = PARADIGM_QUESTIONS[paradigmIdx % PARADIGM_QUESTIONS.length];
    if (choice === currentQ.answer) {
      setParadigmScore(s => s + 1);
      showToast?.('Correct Paradigm! 🎉');
    } else {
      showToast?.(`Incorrect! Answer was: ${currentQ.answer}`);
    }
    setParadigmIdx(i => i + 1);
  };

  return (
    <div className="space-y-6">
      {/* Essential Concept Definitions */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Book className="w-4 h-4 text-indigo-400" /> Essential Concept Definitions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 shadow-sm">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm">
              <BrainCircuit className="w-4 h-4" />
              <span>Artificial Intelligence (AI)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Definition:</strong> The broad field of computer science focused on creating systems capable of executing tasks that typically require human intelligence, such as visual perception, decision-making, natural language translation, and problem solving.
            </p>
            <div className="text-[11px] text-slate-400 bg-slate-950 p-2 rounded-lg border border-slate-800/80">
              <strong>Key Distinction:</strong> Includes both symbolic/rule-based systems (expert systems with explicit hardcoded logic) and statistical data-driven learning models.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 shadow-sm">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
              <Cpu className="w-4 h-4" />
              <span>Machine Learning (ML)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Definition:</strong> A specialized branch of AI wherein algorithms automatically analyze data, recognize complex underlying patterns, and improve their decision-making accuracy over time without being explicitly programmed with manual rules.
            </p>
            <div className="text-[11px] text-slate-400 bg-slate-950 p-2 rounded-lg border border-slate-800/80">
              <strong>Paradigm Shift:</strong> Traditional Programming: <MathText text="$\text{Data} + \text{Rules} \rightarrow \text{Answers}$" />. Machine Learning: <MathText text="$\text{Data} + \text{Answers} \rightarrow \text{Model Rules}$" />.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 shadow-sm">
            <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm">
              <Layers className="w-4 h-4" />
              <span>Deep Learning (DL)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Definition:</strong> A subset of ML utilizing multi-layered Artificial Neural Networks (ANNs) to automatically extract hierarchical representations from raw unstructured data (such as images, video, audio, and text).
            </p>
            <div className="text-[11px] text-slate-400 bg-slate-950 p-2 rounded-lg border border-slate-800/80">
              <strong>Key Advantage:</strong> Eliminates manual feature engineering by learning low-level (edges), mid-level (shapes), and high-level (object parts) features end-to-end.
            </div>
          </div>
        </div>
      </div>

      {/* Learning Paradigms Reference */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-sm">
        <h3 className="font-bold text-sm text-sky-400 flex items-center gap-2">
          <GitCompare className="w-4 h-4" /> Supervised vs Unsupervised vs Reinforcement Learning
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="font-bold text-sky-300 text-sm">Supervised Learning</div>
            <p className="text-slate-300">
              <strong>Definition:</strong> Models trained on a dataset containing input features (<MathText text="$X$" />) paired with explicit target labels (<MathText text="$y$" />). The objective is to learn a mapping function <MathText text="$f(X) \approx y$" />.
            </p>
            <div className="text-slate-400 space-y-1 text-[11px]">
              <div>• <strong>Classification:</strong> Predicting discrete categorical labels (e.g. Spam vs Not Spam, Tumor vs Benign).</div>
              <div>• <strong>Regression:</strong> Predicting continuous numerical outputs (e.g. House Price, Temperature).</div>
            </div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="font-bold text-emerald-300 text-sm">Unsupervised Learning</div>
            <p className="text-slate-300">
              <strong>Definition:</strong> Models given input data (<MathText text="$X$" />) without target labels (<MathText text="$y$" />). The objective is to independently discover natural groupings, hidden structures, or dimensionality reductions.
            </p>
            <div className="text-slate-400 space-y-1 text-[11px]">
              <div>• <strong>Clustering:</strong> Grouping similar data points (<MathText text="$K$" />-Means, DBSCAN).</div>
              <div>• <strong>Dimensionality Reduction:</strong> Compressing feature spaces (PCA, t-SNE).</div>
            </div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="font-bold text-amber-300 text-sm">Reinforcement Learning</div>
            <p className="text-slate-300">
              <strong>Definition:</strong> An autonomous agent learns optimal behavior through trial-and-error interactions with a dynamic environment to maximize total cumulative reward.
            </p>
            <div className="text-slate-400 space-y-1 text-[11px]">
              <div>• <strong>Key Elements:</strong> Agent, State (<MathText text="$S$" />), Action (<MathText text="$A$" />), Reward (<MathText text="$R$" />), Environment.</div>
              <div>• <strong>Applications:</strong> Game AI (AlphaGo, Chess), Autonomous Driving, Robotics.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Partitioning & Generalization Concepts */}
      <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 space-y-3">
        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Split className="w-4 h-4 text-indigo-400" /> Dataset Partitioning &amp; Generalization Concepts
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-bold text-indigo-400 block">Training Set</span>
            <p className="text-slate-400 text-[11px]">
              The subset of data used directly to optimize model weights and learn relationships (60% – 80% of total data).
            </p>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-bold text-sky-400 block">Validation Set</span>
            <p className="text-slate-400 text-[11px]">
              The subset used during training to tune hyperparameters and prevent overfitting (10% – 20%).
            </p>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-bold text-purple-400 block">Test Set</span>
            <p className="text-slate-400 text-[11px]">
              An unseen dataset reserved exclusively for final unbiased evaluation of model performance (10% – 20%).
            </p>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-bold text-amber-400 block">Generalization</span>
            <p className="text-slate-400 text-[11px]">
              The ultimate goal: A model's ability to make accurate predictions on new, previously unseen data samples.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Paradigm Sorting Game */}
      <div className="p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-xl border border-slate-800 text-white space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xs uppercase tracking-wider text-indigo-300 flex items-center gap-2">
            <HelpCircle className="w-4 h-4" /> Interactive Check: Test Your Understanding
          </h3>
          <span className="text-xs font-mono font-bold text-emerald-400">
            Score: {paradigmScore}/{paradigmIdx}
          </span>
        </div>
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-3">
          <p className="font-medium text-slate-200">
            Scenario: &ldquo;{PARADIGM_QUESTIONS[paradigmIdx % PARADIGM_QUESTIONS.length].q}&rdquo;
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {[
              'Supervised (Regression)',
              'Supervised (Classification)',
              'Unsupervised (Clustering)',
              'Reinforcement Learning'
            ].map(choice => (
              <button
                key={choice}
                onClick={() => handleChoice(choice)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-medium border border-slate-700 active:scale-95 transition"
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Module1Foundations;
