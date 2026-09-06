import React, { useState } from 'react';
import { 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  Video, 
  ExternalLink, 
  Sparkles, 
  MessageSquare, 
  CheckCircle,
  HelpCircle,
  FileText
} from 'lucide-react';
import { Course } from '../../types/course';

interface PresentationTabProps {
  course: Course;
}

export const PresentationTab: React.FC<PresentationTabProps> = ({ course }) => {
  const { presentation } = course;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(true);

  const slides = presentation.slides || [];
  const currentSlide = slides[currentSlideIndex] || slides[0];

  const handlePrevSlide = () => {
    setCurrentSlideIndex(prev => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex(prev => (prev < slides.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="space-y-6">
      
      {/* Presentation Header */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-semibold">
            <Presentation className="w-3.5 h-3.5 text-indigo-400" />
            Slide Deck & Capstone Defense
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            {presentation.title}
          </h3>
          <p className="text-xs text-slate-400">
            Interactive slide deck viewer, executive summary, and defense Q&A preparation.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {presentation.videoUrl && (
            <a
              href={presentation.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/30 transition-all"
            >
              <Video className="w-4 h-4" />
              <span>Watch Demo / Recording</span>
              <ExternalLink className="w-3 h-3 text-rose-200" />
            </a>
          )}
        </div>
      </div>

      {/* Interactive Slide Viewer & Carousel */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Slide Deck Toolbar */}
        <div className="flex items-center justify-between px-5 py-3 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Presentation className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold text-white">Slide Deck Previewer</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300">
              {currentSlideIndex + 1} of {slides.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                showSpeakerNotes
                  ? 'bg-indigo-600/80 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Speaker Notes</span>
            </button>

            <div className="h-4 w-px bg-slate-800"></div>

            <button
              onClick={handlePrevSlide}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              title="Previous Slide (Arrow Left)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextSlide}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              title="Next Slide (Arrow Right)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slide Canvas Area */}
        {currentSlide && (
          <div className="p-6 lg:p-10 min-h-[380px] flex flex-col justify-between bg-gradient-to-b from-slate-900 to-slate-950">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <span className="text-[11px] font-mono uppercase font-bold text-indigo-400">
                  {course.code} Capstone Slide #{currentSlide.slideNumber}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">MSAI Graduate Program</span>
              </div>

              <div>
                <h4 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
                  {currentSlide.title}
                </h4>
                <p className="text-xs text-indigo-300 font-medium mt-1">
                  {currentSlide.subtitle}
                </p>
              </div>

              {/* Bullet Points */}
              <div className="space-y-2.5 pt-3">
                {currentSlide.bulletPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs lg:text-sm text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0"></span>
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>

              {/* Key Callout Banner */}
              {currentSlide.callout && (
                <div className="mt-4 p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>{currentSlide.callout}</span>
                </div>
              )}
            </div>

            {/* Slide Carousel Dots */}
            <div className="flex items-center justify-center gap-2 pt-6">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlideIndex
                      ? 'w-8 bg-indigo-500'
                      : 'w-2 bg-slate-700 hover:bg-slate-600'
                  }`}
                  title={`Go to Slide ${idx + 1}`}
                ></button>
              ))}
            </div>
          </div>
        )}

        {/* Speaker Notes Drawer */}
        {showSpeakerNotes && currentSlide && (
          <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 text-xs">
            <span className="font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1 text-[10px]">
              <MessageSquare className="w-3.5 h-3.5" /> Presenter Talking Points & Defense Script
            </span>
            <p className="text-slate-300 leading-relaxed italic">
              "{currentSlide.speakerNotes}"
            </p>
          </div>
        )}
      </div>

      {/* Executive Summary & Key Findings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Executive Summary */}
        <div className="rounded-2xl p-5 bg-slate-900/80 border border-slate-800 shadow-md space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-blue-400" /> Executive Summary
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            {presentation.executiveSummary}
          </p>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-[11px] font-semibold text-indigo-300">Target Audience</span>
            <p className="text-[11px] text-slate-400">
              Department Faculty Review Committee, Course Instructors, and Academic Peer Reviewers.
            </p>
          </div>
        </div>

        {/* Key Findings List */}
        <div className="rounded-2xl p-5 bg-slate-900/80 border border-slate-800 shadow-md space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Key Empirical Findings
          </span>

          <ul className="space-y-2">
            {presentation.keyFindings.map((finding, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5 font-bold">✓</span>
                <span className="leading-snug">{finding}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Defense Q&A Preparation */}
      {presentation.qaChecklist.length > 0 && (
        <div className="rounded-2xl p-5 lg:p-6 bg-slate-900/80 border border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div>
              <h5 className="text-sm font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-400" />
                Anticipated Defense Questions & Rebuttals
              </h5>
              <p className="text-xs text-slate-400">Preparation for oral examinations and professor inquiries</p>
            </div>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
              {presentation.qaChecklist.length} Questions
            </span>
          </div>

          <div className="space-y-3">
            {presentation.qaChecklist.map((qa, idx) => (
              <div key={idx} className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-2">
                <div className="flex items-start gap-2 text-xs font-bold text-indigo-200">
                  <span className="text-amber-400">Q:</span>
                  <span>{qa.question}</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-300 pl-4 border-l-2 border-indigo-500/50">
                  <span className="text-emerald-400 font-semibold">A:</span>
                  <p className="leading-relaxed">{qa.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};