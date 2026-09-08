import React, { useState } from 'react';
import {
  Calendar,
  BookOpen,
  Brain,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
  X
} from 'lucide-react';
import { Semester, Course, ActiveView } from '../types/course';

interface SidebarProps {
  semesters: Semester[];
  activeSemesterId: string;
  setActiveSemesterId: (id: string) => void;
  activeCourseId: string;
  setActiveCourseId: (id: string) => void;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  semesters,
  activeSemesterId,
  setActiveSemesterId,
  activeCourseId,
  setActiveCourseId,
  activeView,
  setActiveView,
  isMobileOpen = false,
  onMobileClose = () => { },
}) => {
  const currentSemester = semesters.find(s => s.id === activeSemesterId) || semesters[0];

  return (
    <>
      {/* Mobile Backdrop Overlay (strictly lg:hidden) */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 lg:hidden transition-opacity animate-fade-in"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar: Slide-over Drawer on Mobile (<lg), Static Column on Desktop (lg:) */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-80 max-w-[85vw] lg:w-72
          bg-slate-900 lg:bg-slate-900/70
          border-r border-slate-800 p-4
          flex flex-col gap-5 shrink-0 overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Mobile Drawer Header (strictly lg:hidden) */}
        <div className="flex lg:hidden items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm text-white">Degree Navigation</span>
          </div>
          <button
            onClick={onMobileClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Root Fundamentals Quick Card */}
        <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900/90 rounded-xl p-3.5 border border-indigo-900/40 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Degree Foundation
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold">
              Root Level
            </span>
          </div>
          <button
            onClick={() => {
              setActiveView('fundamentals');
              onMobileClose();
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${activeView === 'fundamentals'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400'
              : 'bg-slate-800/80 text-slate-200 hover:bg-slate-800 hover:text-white border border-slate-700/60'
              }`}
          >
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-indigo-300" />
              <div className="text-left">
                <p className="font-bold">My Learning</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 opacity-70" />
          </button>
        </div>

        {/* Semester Header & Selector */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-400" /> Semesters
            </span>
          </div>

          {/* Semester selector pills */}
          <div className="flex flex-wrap gap-1.5">
            {semesters.map(sem => {
              const isSelected = sem.id === activeSemesterId;
              return (
                <button
                  key={sem.id}
                  onClick={() => {
                    setActiveSemesterId(sem.id);
                    if (sem.courses.length > 0 && !sem.courses.some(c => c.id === activeCourseId)) {
                      setActiveCourseId(sem.courses[0].id);
                    }
                    setActiveView('course');
                    onMobileClose();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${isSelected
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                    }`}
                >
                  <span>{sem.name}</span>
                  {sem.isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Courses List for Current Semester */}
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Courses ({currentSemester?.courses.length || 0})
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {currentSemester?.courses.map((course: Course) => {
              const isActive = activeView === 'course' && activeCourseId === course.id;
              return (
                <div
                  key={course.id}
                  className={`rounded-xl transition-all border p-3 flex flex-col gap-2 cursor-pointer ${isActive
                    ? 'bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 border-blue-500/50 shadow-md shadow-blue-900/20 ring-1 ring-blue-500/30'
                    : 'bg-slate-800/40 hover:bg-slate-800/80 border-slate-800/80 text-slate-300'
                    }`}
                  onClick={() => {
                    setActiveCourseId(course.id);
                    setActiveView('course');
                    onMobileClose();
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-800 text-blue-300 border border-slate-700'
                        }`}>
                        {course.code}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">{course.section}</span>
                    </div>

                    {course.canvasUrl && (
                      <a
                        href={course.canvasUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title="Open SJSU Canvas Course"
                        className="text-slate-400 hover:text-amber-400 transition-colors p-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">
                    {course.name}
                  </h4>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/60">
                    <span>{course.credits} Units</span>
                    <span className="flex items-center gap-1 text-indigo-300">
                      <Layers className="w-3 h-3" />
                      4 Subtabs
                    </span>
                  </div>
                </div>
              );
            })}

            {(!currentSemester || currentSemester.courses.length === 0) && (
              <div className="text-center py-6 px-3 bg-slate-800/30 rounded-xl border border-dashed border-slate-700/60 text-slate-400">
                <p className="text-xs">No courses in this term yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Program Summary Footer */}
        <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex flex-col gap-1">
          <div className="flex justify-between">
            <span>Degree:</span>
            <strong className="text-slate-200">MS Artificial Intelligence</strong>
          </div>
          <div className="flex justify-between">
            <span>University:</span>
            <strong className="text-slate-200">San José State University</strong>
          </div>
          <div className="flex justify-between">
            <span>Department:</span>
            <strong className="text-slate-200">Computer Engineering</strong>
          </div>
        </div>

      </aside>
    </>
  );
};