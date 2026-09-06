import React, { useState } from 'react';
import { 
  Brain, 
  CheckCircle2, 
  Circle, 
  Code2, 
  Calculator, 
  Sparkles, 
  Plus, 
  Copy, 
  Check, 
  Calendar,
  Layers,
  Tag,
  BookOpen
} from 'lucide-react';
import { Course, CustomUserNote } from '../../types/course';
import { MathFormula } from '../ui/MathFormula';

interface MyLearningTabProps {
  course: Course;
  toggleConceptMastery: (courseId: string, conceptId: string) => void;
  customNotes: CustomUserNote[];
  addCustomNote: (note: Omit<CustomUserNote, 'id' | 'createdAt'>) => void;
}

export const MyLearningTab: React.FC<MyLearningTabProps> = ({
  course,
  toggleConceptMastery,
  customNotes,
  addCustomNote,
}) => {
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // New Note Form State
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteLatex, setNoteLatex] = useState('');
  const [noteCategory, setNoteCategory] = useState('Lecture Note');

  const courseCustomNotes = customNotes.filter(n => n.context === course.id);
  const masteredConceptsCount = course.concepts.filter(c => c.mastered).length;

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;

    addCustomNote({
      context: course.id,
      title: noteTitle,
      category: noteCategory,
      content: noteContent,
      latex: noteLatex.trim() || undefined
    });

    setNoteTitle('');
    setNoteContent('');
    setNoteLatex('');
    setShowNoteForm(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Concept Mastery Tracker */}
      <div className="rounded-2xl p-5 lg:p-6 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Course Learning & Knowledge Base
            </span>
          </div>
          <h3 className="text-lg font-bold text-white">
            {course.code} Concept Mastery & Lecture Derivations
          </h3>
          <p className="text-xs text-slate-400 max-w-xl">
            Track key theoretical concepts, inspect mathematical proofs rendered in LaTeX, and review vectorized implementations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 flex flex-col gap-1 min-w-[170px]">
            <span className="text-[11px] text-slate-400">Mastered Concepts</span>
            <span className="text-base font-bold text-emerald-400">
              {masteredConceptsCount} / {course.concepts.length}
            </span>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${(masteredConceptsCount / (course.concepts.length || 1)) * 100}%` }}
              ></div>
            </div>
          </div>

          <button
            onClick={() => setShowNoteForm(!showNoteForm)}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{showNoteForm ? 'Close' : 'Add Note'}</span>
          </button>
        </div>
      </div>

      {/* Concept Mastery Checklist Grid */}
      <div className="rounded-2xl p-5 bg-slate-900/80 border border-slate-800 shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-400" /> Core Concepts Checklist
          </span>
          <span className="text-[11px] text-slate-400">Click to toggle mastery</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {course.concepts.map((concept) => (
            <div
              key={concept.id}
              onClick={() => toggleConceptMastery(course.id, concept.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                concept.mastered
                  ? 'bg-emerald-950/20 border-emerald-800/60 shadow-sm'
                  : 'bg-slate-950/40 border-slate-800 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {concept.category}
                </span>
                {concept.mastered ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                )}
              </div>
              <h5 className="text-xs font-bold text-white leading-tight">
                {concept.name}
              </h5>
              <p className="text-[11px] text-slate-400 leading-snug">
                {concept.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Custom Note Form */}
      {showNoteForm && (
        <form onSubmit={handleSaveNote} className="bg-slate-900 border border-indigo-500/40 rounded-xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Add Note for {course.code}
            </h4>
            <span className="text-[11px] text-slate-400">Stored in browser local storage</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Note Title</label>
              <input
                type="text"
                placeholder="e.g. Proof of Convexity for OLS Loss"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category / Tag</label>
              <input
                type="text"
                placeholder="e.g. Optimization, Derivation"
                value={noteCategory}
                onChange={(e) => setNoteCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">LaTeX Math (Optional)</label>
            <input
              type="text"
              placeholder="e.g. \\nabla_\\theta J(\\theta) = \\frac{1}{m} X^T(X\\theta - y)"
              value={noteLatex}
              onChange={(e) => setNoteLatex(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono rounded-lg bg-slate-800 border border-slate-700 text-indigo-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            {noteLatex.trim() && (
              <div className="mt-2">
                <span className="text-[10px] uppercase font-bold text-slate-400">Live Preview:</span>
                <MathFormula latex={noteLatex} />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Notes & Explanations</label>
            <textarea
              rows={3}
              placeholder="Detailed lecture takeaways or observations..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            ></textarea>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowNoteForm(false)}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              Save Course Note
            </button>
          </div>
        </form>
      )}

      {/* User Custom Notes for this course */}
      {courseCustomNotes.length > 0 && (
        <div className="space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Your Custom Notes ({courseCustomNotes.length})
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courseCustomNotes.map((note) => (
              <div key={note.id} className="bg-slate-900 border border-indigo-500/30 rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">{note.category}</span>
                  <span className="text-slate-500">{new Date(note.createdAt).toLocaleDateString()}</span>
                </div>
                <h5 className="text-xs font-bold text-white">{note.title}</h5>
                {note.latex && <MathFormula latex={note.latex} />}
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Curated Lecture Notes with LaTeX & Code */}
      <div className="space-y-6">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-blue-400" /> Deep-Dive Lecture Notes & Formulations
        </span>

        {course.notes.map((note) => (
          <div key={note.id} className="rounded-2xl p-5 lg:p-6 bg-slate-900/90 border border-slate-800 shadow-md space-y-5">
            
            {/* Note Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50">
                    {note.week}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{note.date}</span>
                  </div>
                </div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  {note.title}
                </h4>
              </div>

              <div className="flex flex-wrap gap-1">
                {note.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 flex items-center gap-1">
                    <Tag className="w-2.5 h-2.5 text-slate-500" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Note Summary */}
            <p className="text-xs text-slate-300 leading-relaxed">
              {note.summary}
            </p>

            {/* Key Points Bullet List */}
            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/80 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Key Analytical Takeaways
              </span>
              <ul className="space-y-1.5">
                {note.keyPoints.map((point, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-indigo-400 mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Math Formulas Section */}
            {note.mathFormulas.length > 0 && (
              <div className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-indigo-400" /> Mathematical Derivations
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {note.mathFormulas.map((formula, idx) => (
                    <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
                      <div>
                        <p className="text-xs font-semibold text-indigo-200 mb-1">{formula.title}</p>
                        <MathFormula latex={formula.latex} />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2 italic">{formula.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Code Snippets Section */}
            {note.codeSnippets.length > 0 && (
              <div className="space-y-3">
                {note.codeSnippets.map((snippet, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-cyan-400" /> {snippet.title}
                      </span>
                      <button
                        onClick={() => handleCopyCode(`${note.id}-${idx}`, snippet.code)}
                        className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors px-2 py-0.5 rounded bg-slate-800"
                      >
                        {copiedCodeId === `${note.id}-${idx}` ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                      <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                        <code>{snippet.code}</code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
};