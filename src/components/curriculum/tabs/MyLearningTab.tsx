import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  BookOpen 
} from 'lucide-react';
import { Course, CustomUserNote } from '../../../types/course';
import { getWeekComponent, isWeekAvailable } from '../registry';
import { curriculumNavStore } from '../navigationStore';

interface MyLearningTabProps {
  course: Course;
  toggleConceptMastery?: (courseId: string, conceptId: string) => void;
  customNotes?: CustomUserNote[];
  addCustomNote?: (note: Omit<CustomUserNote, 'id' | 'createdAt'>) => void;
}

export const MyLearningTab: React.FC<MyLearningTabProps> = ({
  course,
}) => {
  const defaultWeekId = course.modules[0]?.id || 'week-01';

  // In-memory active week navigation state (preserved across course/tab switches, resets on refresh)
  const [activeWeekId, setActiveWeekIdState] = useState<string>(() =>
    curriculumNavStore.getWeekForCourse(course.id, defaultWeekId)
  );

  const handleSelectWeek = (weekId: string) => {
    curriculumNavStore.setWeekForCourse(course.id, weekId);
    setActiveWeekIdState(weekId);
  };

  // Restore preserved week for this course when course changes
  useEffect(() => {
    const savedWeek = curriculumNavStore.getWeekForCourse(course.id, defaultWeekId);
    setActiveWeekIdState(savedWeek);
  }, [course.id, defaultWeekId]);

  const currentModule = course.modules.find(m => m.id === activeWeekId) || course.modules[0];

  return (
    <div className="space-y-6">

      {/* Weekly Syllabus Tab Navigation Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            Weekly Syllabus Modules ({course.modules.length} Weeks)
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {course.modules.map((mod) => {
            const isSelected = activeWeekId === mod.id;
            const available = isWeekAvailable(course, mod);
            const isCompleted = available && mod.status === 'completed';
            const isInProgress = available && mod.status === 'in-progress';
            const weekLabel = mod.week.replace(/^Session\s*/i, 'Week ');

            return (
              <button
                key={mod.id}
                onClick={() => handleSelectWeek(mod.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                  isSelected
                    ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/30 ring-1 ring-blue-400/40'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                title={`${weekLabel}: ${mod.title}`}
              >
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                  isSelected ? 'bg-blue-700 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {weekLabel}
                </span>
                <span>{mod.title}</span>
                {isCompleted && (
                  <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-emerald-400'}`} />
                )}
                {isInProgress && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Resolved Weekly Learning View (Terms -> Class -> Week -> Modules) */}
      {currentModule && (() => {
        const WeekView = getWeekComponent(course, currentModule);
        return (
          <div className="space-y-6 animate-fade-in">
            <WeekView course={course} module={currentModule} />
          </div>
        );
      })()}

    </div>
  );
};