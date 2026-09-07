import React, { useState } from 'react';
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
    fundamentals,
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
    toggleFundamentalMastery,
    toggleDeliverable,
    addCustomNote,
    addCourse,
    addSemester,
    resetToDefaults,
  } = useMsaiStorage();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isAddSemesterOpen, setIsAddSemesterOpen] = useState(false);

  // Statistics calculation
  const fundamentalsMasteredCount = fundamentals.filter(f => f.mastered).length;
  const totalCoursesCount = semesters.reduce((acc, sem) => acc + sem.courses.length, 0);

  // Direct navigation to Week 1 of AI course (CMPE-252)
  const navigateToWeek1AI = () => {
    setActiveSemesterId('sem-1-fall-26');
    setActiveCourseId('cmpe-252-sec-01');
    setActiveTab('mylearning');
    setActiveView('course');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Application Header */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        fundamentalsMasteredCount={fundamentalsMasteredCount}
        totalFundamentals={fundamentals.length}
        currentSemesterName={currentSemester?.name || 'Sem 1 - Fall 26'}
        totalCoursesCount={totalCoursesCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onReset={resetToDefaults}
      />

      {/* Main Workspace Layout with Sidebar + View */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Navigation Sidebar for Semesters & Courses */}
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
        />

        {/* Dynamic Content View Area */}
        <main className="flex-1 flex flex-col bg-slate-950 overflow-y-auto">
          {activeView === 'fundamentals' ? (
            <RootLearningView
              fundamentals={fundamentals}
              toggleFundamentalMastery={toggleFundamentalMastery}
              customNotes={customNotes}
              addCustomNote={addCustomNote}
              searchQuery={searchQuery}
              onNavigateToWeek1={navigateToWeek1AI}
            />
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