import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Brain, 
  Rocket, 
  Presentation, 
  ExternalLink, 
  CalendarDays, 
  User,
  Sparkles
} from 'lucide-react';
import { Course, SubTabType, CustomUserNote } from '../types/course';
import { ClassTab, MyLearningTab, ProjectTab, PresentationTab } from './curriculum/tabs';
import { curriculumNavStore } from './curriculum/navigationStore';

interface CourseWorkspaceProps {
  course: Course;
  semesterName: string;
  activeTab?: SubTabType;
  setActiveTab?: (tab: SubTabType) => void;
  toggleConceptMastery: (courseId: string, conceptId: string) => void;
  toggleDeliverable: (courseId: string, deliverableId: string) => void;
  customNotes: CustomUserNote[];
  addCustomNote: (note: Omit<CustomUserNote, 'id' | 'createdAt'>) => void;
}

export const CourseWorkspace: React.FC<CourseWorkspaceProps> = ({
  course,
  semesterName,
  activeTab: propActiveTab,
  setActiveTab: propSetActiveTab,
  toggleConceptMastery,
  toggleDeliverable,
  customNotes,
  addCustomNote,
}) => {
  // In-memory tab selection per course (persists during session, resets on refresh)
  const [activeTab, setActiveTabState] = useState<SubTabType>(() =>
    curriculumNavStore.getTabForCourse(course.id, 'class') as SubTabType
  );

  const handleSelectTab = (tabId: SubTabType) => {
    curriculumNavStore.setTabForCourse(course.id, tabId);
    setActiveTabState(tabId);
    if (propSetActiveTab) {
      propSetActiveTab(tabId);
    }
  };

  // Restore preserved tab when switching courses
  useEffect(() => {
    const savedTab = curriculumNavStore.getTabForCourse(course.id, 'class') as SubTabType;
    setActiveTabState(savedTab);
    if (propSetActiveTab) {
      propSetActiveTab(savedTab);
    }
  }, [course.id]);

  const tabs: { id: SubTabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'class', label: 'Class', icon: GraduationCap },
    { id: 'mylearning', label: 'MyLearning', icon: Brain },
    { id: 'project', label: 'Project', icon: Rocket },
    { id: 'presentation', label: 'Presentation', icon: Presentation },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 lg:p-8 flex flex-col gap-4 sm:gap-6 max-w-6xl mx-auto w-full">
      
      {/* Course Header Banner */}
      <div className="rounded-2xl p-4 sm:p-6 lg:p-7 bg-slate-900 border border-slate-800 shadow-xl space-y-3 sm:space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-blue-600 text-white shadow-sm">
                {course.code}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {course.section}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {semesterName}
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              {course.name}
            </h2>
          </div>

          {/* Quick Action Links: SJSU Canvas */}
          <div className="flex items-center gap-2.5 shrink-0">
            {course.canvasUrl && (
              <a
                href={course.canvasUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all transform active:scale-95 shrink-0"
              >
                <span>SJSU Canvas Course</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Course Quick Metadata */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-6 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-indigo-400" />
            <span>Instructor: <strong className="text-white">{course.instructor.name}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5 text-blue-400" />
            <span>Schedule: <strong className="text-white">{course.schedule}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Units: <strong className="text-white">{course.credits} Credits</strong></span>
          </div>
        </div>
      </div>

      {/* Course Subtabs Navigation */}
      <div className="flex items-center gap-1.5 sm:gap-2 border-b border-slate-800 pb-1 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleSelectTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap relative shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {isActive && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-cyan-400 rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Subtab Workspace Content */}
      <div className="transition-opacity duration-200">
        {activeTab === 'class' && (
          <ClassTab course={course} />
        )}

        {activeTab === 'mylearning' && (
          <MyLearningTab
            course={course}
            toggleConceptMastery={toggleConceptMastery}
            customNotes={customNotes}
            addCustomNote={addCustomNote}
          />
        )}

        {activeTab === 'project' && (
          <ProjectTab
            course={course}
            toggleDeliverable={toggleDeliverable}
          />
        )}

        {activeTab === 'presentation' && (
          <PresentationTab course={course} />
        )}
      </div>

    </div>
  );
};