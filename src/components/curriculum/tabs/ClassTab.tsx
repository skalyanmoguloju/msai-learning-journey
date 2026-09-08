import React from 'react';
import { 
  BookOpen, 
  User, 
  Clock, 
  Mail, 
  ExternalLink, 
  CheckCircle2, 
  Clock3, 
  AlertCircle,
  Award,
  GraduationCap,
  CalendarDays
} from 'lucide-react';
import { Course } from '../../../types/course';
import { isWeekAvailable } from '../registry';
import { Construction } from 'lucide-react';

interface ClassTabProps {
  course: Course;
}

export const ClassTab: React.FC<ClassTabProps> = ({ course }) => {
  return (
    <div className="space-y-6">
      
      {/* Top Banner: Canvas Quick Access & Instructor Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Canvas & Course Portal Access */}
        <div className="lg:col-span-2 rounded-2xl p-5 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 flex flex-col justify-between shadow-md">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" /> Official University Portal
              </span>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {course.credits} Graduate Units
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-white tracking-tight">
              {course.code} {course.section}: {course.name}
            </h3>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              Enrolled in San José State University (SJSU) Computer Engineering Department. 
              Access official course announcements, homework submissions, and lecture recordings via Canvas.
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <CalendarDays className="w-4 h-4 text-blue-400" />
              <span>{course.schedule}</span>
            </div>

            {course.canvasUrl && (
              <a
                href={course.canvasUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all transform active:scale-95"
              >
                <span>Open SJSU Canvas Course</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Instructor & Office Hours */}
        <div className="rounded-2xl p-5 bg-slate-900/90 border border-slate-800 flex flex-col justify-between shadow-md">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
              <User className="w-3.5 h-3.5 text-indigo-400" /> Instructor Details
            </span>
            <h4 className="text-sm font-bold text-white mb-1">{course.instructor.name}</h4>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <a href={`mailto:${course.instructor.email}`} className="hover:text-indigo-300 underline">
                {course.instructor.email}
              </a>
            </div>
            <div className="space-y-1 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 text-xs">
              <div className="flex items-center gap-1.5 text-indigo-300 font-semibold">
                <Clock className="w-3.5 h-3.5" /> Office Hours
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {course.instructor.officeHours}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Grading Distribution & Textbooks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Grading Scheme */}
        <div className="rounded-2xl p-5 bg-slate-900/80 border border-slate-800 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-cyan-400" /> Grading Breakdown
              </span>
              <span className="text-xs font-semibold text-slate-400">Total: 100%</span>
            </div>

            {/* Visual breakdown bar */}
            <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-800 mb-4">
              {course.grading.map((item, idx) => {
                const colors = ['bg-indigo-500', 'bg-blue-500', 'bg-cyan-500', 'bg-emerald-500', 'bg-purple-500'];
                return (
                  <div
                    key={idx}
                    className={`${colors[idx % colors.length]} h-full transition-all`}
                    style={{ width: `${item.weight}%` }}
                    title={`${item.item}: ${item.weight}%`}
                  ></div>
                );
              })}
            </div>

            <div className="space-y-2">
              {course.grading.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-slate-800/50">
                  <span className="text-slate-300">{item.item}</span>
                  <span className="font-bold text-white font-mono bg-slate-800/80 px-2 py-0.5 rounded">
                    {item.weight}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Textbooks & Essential Readings */}
        <div className="rounded-2xl p-5 bg-slate-900/80 border border-slate-800 shadow-md flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" /> Prescribed Textbooks & Materials
            </span>

            <div className="space-y-3">
              {course.textbooks.map((book, idx) => (
                <div key={idx} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex justify-between items-center gap-3">
                  <div>
                    <h5 className="text-xs font-bold text-white leading-tight">{book.title}</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">Author: {book.author}</p>
                  </div>
                  {book.link && (
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
                      title="Access book reference"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Weekly Syllabus Roadmap */}
      <div className="rounded-2xl p-5 lg:p-6 bg-slate-900/90 border border-slate-800 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-base font-bold text-white tracking-tight">Syllabus & Module Schedule</h4>
            <p className="text-xs text-slate-400">Complete 16-week semester curriculum roadmap</p>
          </div>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
            {course.modules.length} Modules
          </span>
        </div>

        <div className="space-y-3">
          {course.modules.map((mod) => {
            const available = isWeekAvailable(course, mod);
            // Only surface completion / in-progress status if the week is fully implemented.
            // Stub (under-construction) weeks always appear as "not started".
            const isCompleted = available && mod.status === 'completed';
            const isInProgress = available && mod.status === 'in-progress';
            const isStub = !available;

            return (
              <div
                key={mod.id}
                className={`rounded-xl p-4 border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isStub
                    ? 'bg-slate-950/20 border-slate-700/30 opacity-70'
                    : isInProgress
                    ? 'bg-gradient-to-r from-blue-950/40 to-slate-900 border-blue-500/50 shadow-md shadow-blue-950/30'
                    : isCompleted
                    ? 'bg-slate-950/40 border-slate-800/80 text-slate-300'
                    : 'bg-slate-950/20 border-slate-800/40 opacity-85'
                }`}
              >
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      {mod.week.replace(/^Session\s*/i, 'Week ')}
                    </span>
                    <h5 className="text-xs md:text-sm font-bold text-white">
                      {mod.title}
                    </h5>
                  </div>
                  <p className="text-xs text-slate-300">{mod.description}</p>
                  
                  {/* Topic pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {mod.topics.map((t, tidx) => (
                      <span key={tidx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-1.5 shrink-0">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                    isStub
                      ? 'bg-slate-800/60 text-slate-500 border border-slate-700/50'
                      : isCompleted
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : isInProgress
                      ? 'bg-blue-950 text-blue-300 border border-blue-800 animate-pulse'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isStub && <Construction className="w-3 h-3 text-slate-500" />}
                    {!isStub && isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                    {!isStub && isInProgress && <Clock3 className="w-3 h-3 text-blue-400" />}
                    {!isStub && !isCompleted && !isInProgress && <AlertCircle className="w-3 h-3 text-slate-500" />}
                    <span className="capitalize">
                      {isStub ? 'Under Construction' : mod.status.replace('-', ' ')}
                    </span>
                  </span>

                  {mod.reading && (
                    <span className="text-[10px] text-slate-400 italic">
                      Read: {mod.reading}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};