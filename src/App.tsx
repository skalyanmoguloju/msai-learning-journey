import React, { useState } from 'react';
import { Layers } from 'lucide-react';
import { useMsaiStorage } from './hooks/useMsaiStorage';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { RootLearningView } from './components/RootLearningView';
import { CourseWorkspace } from './components/CourseWorkspace';
import { AddCourseModal } from './components/modals/AddCourseModal';
import { AddSemesterModal } from './components/modals/AddSemesterModal';

export function App() {
  const {
    semesters,
    activeView,
    setActiveView,
    activeSemesterId,
    setActiveSemesterId,
    activeCourseId,
    setActiveCourseId,
    activeTab,
    setActiveTab,
    currentSemester,
    currentCourse,
    customNotes,
    toggleConceptMastery,
    toggleDeliverable,
    addCustomNote,
    addCourse,
    addSemester,
    resetToDefaults,
  } = useMsaiStorage();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isAddSemesterOpen, setIsAddSemesterOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Application Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onReset={resetToDefaults}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
      />

      {/* Mobile Context & Quick Switcher (strictly lg:hidden) */}
      <div className="lg:hidden flex items-center justify-between px-3.5 py-1.5 bg-slate-900/90 border-b border-slate-800/80 text-xs shrink-0">
        <div className="flex items-center gap-2 truncate min-w-0">
          <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold text-[10px] shrink-0 border border-indigo-500/30">
            {activeView === 'fundamentals' ? 'FOUNDATION' : currentCourse?.code || 'COURSE'}
          </span>
          <span className="text-slate-200 text-xs font-medium truncate">
            {activeView === 'fundamentals' ? 'Calculus Mastery Hub' : currentCourse?.name || 'Course Workspace'}
          </span>
        </div>
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-semibold shrink-0 border border-slate-700/60 active:scale-95 transition-all ml-2"
        >
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          <span>Courses</span>
        </button>
      </div>

      {/* Main Workspace Layout with Sidebar + View */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* Navigation Sidebar for Semesters & Courses (Drawer on mobile, pinned on desktop) */}
        <Sidebar
          semesters={semesters}
          activeSemesterId={activeSemesterId}
          setActiveSemesterId={setActiveSemesterId}
          activeCourseId={activeCourseId}
          setActiveCourseId={setActiveCourseId}
          activeView={activeView}
          setActiveView={setActiveView}
          onOpenAddCourse={() => setIsAddCourseOpen(true)}
          onOpenAddSemester={() => setIsAddSemesterOpen(true)}
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Dynamic Content View Area */}
        <main className="flex-1 flex flex-col bg-slate-950 overflow-y-auto w-full">
          {activeView === 'fundamentals' ? (
            <RootLearningView />
          ) : currentCourse ? (
            <CourseWorkspace
              course={currentCourse}
              semesterName={currentSemester?.name || 'Sem 1 - Fall 26'}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              toggleConceptMastery={toggleConceptMastery}
              toggleDeliverable={toggleDeliverable}
              customNotes={customNotes}
              addCustomNote={addCustomNote}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400">
              <div>
                <p className="text-base font-semibold">No course selected.</p>
                <p className="text-xs text-slate-500 mt-1">Select a course from the sidebar to inspect its modules and subtabs.</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Course Modal */}
      <AddCourseModal
        isOpen={isAddCourseOpen}
        onClose={() => setIsAddCourseOpen(false)}
        semesterName={currentSemester?.name || 'Selected Term'}
        semesterId={activeSemesterId}
        onAddCourse={addCourse}
      />

      {/* Add Semester Modal */}
      <AddSemesterModal
        isOpen={isAddSemesterOpen}
        onClose={() => setIsAddSemesterOpen(false)}
        onAddSemester={addSemester}
      />

    </div>
  );
}

export default App;