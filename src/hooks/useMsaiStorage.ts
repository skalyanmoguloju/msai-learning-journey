import { useState, useEffect } from 'react';
import { Semester, FundamentalTopic, SubTabType, ActiveView, CustomUserNote, Course } from '../types/course';
import { INITIAL_SEMESTERS } from '../data/msaiData';
import { INITIAL_FUNDAMENTALS } from '../data/fundamentalsData';

const STORAGE_KEYS = {
  SEMESTERS: 'msai_journey_semesters_v2',
  SEMESTERS_LEGACY: 'msai_journey_semesters_v1',
  FUNDAMENTALS: 'msai_journey_fundamentals_v1',
  ACTIVE_SEMESTER: 'msai_journey_active_sem_v1',
  ACTIVE_COURSE: 'msai_journey_active_course_v1',
  ACTIVE_TAB: 'msai_journey_active_tab_v1',
  ACTIVE_VIEW: 'msai_journey_active_view_v1',
  CUSTOM_NOTES: 'msai_journey_custom_notes_v1',
};

function normalizeSemesters(sems: Semester[]): Semester[] {
  return sems.map(sem => ({
    ...sem,
    courses: sem.courses.map(course => ({
      ...course,
      modules: course.modules.map(mod => ({
        ...mod,
        week: mod.week ? mod.week.replace(/^Session\s*/i, 'Week ') : mod.week,
        description: mod.description ? mod.description.replace(/Session\s*/gi, 'Week ') : mod.description,
        reading: mod.reading ? mod.reading.replace(/Session\s*/gi, 'Week ') : mod.reading
      })),
      notes: course.notes ? course.notes.map(note => ({
        ...note,
        week: note.week ? note.week.replace(/^Session\s*/i, 'Week ') : note.week
      })) : course.notes,
      project: course.project ? {
        ...course.project,
        pipelineSteps: course.project.pipelineSteps.map(step => ({
          ...step,
          description: step.description ? step.description.replace(/Session\s*/gi, 'Week ') : step.description,
          tool: step.tool ? step.tool.replace(/Session\s*/gi, 'Week ') : step.tool
        })),
        metrics: course.project.metrics.map(metric => ({
          ...metric,
          baseline: metric.baseline ? metric.baseline.replace(/Session\s*/gi, 'Week ') : metric.baseline
        })),
        deliverables: course.project.deliverables.map(del => ({
          ...del,
          title: del.title ? del.title.replace(/Session\s*/gi, 'Week ') : del.title
        }))
      } : course.project
    }))
  }));
}

export function useMsaiStorage() {
  const [semesters, setSemesters] = useState<Semester[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SEMESTERS) || localStorage.getItem(STORAGE_KEYS.SEMESTERS_LEGACY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return normalizeSemesters(parsed);
      }
    } catch (e) {
      console.warn('Failed to load semesters from storage:', e);
    }
    return normalizeSemesters(INITIAL_SEMESTERS);
  });

  const [fundamentals, setFundamentals] = useState<FundamentalTopic[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FUNDAMENTALS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load fundamentals from storage:', e);
    }
    return INITIAL_FUNDAMENTALS;
  });

  const [activeView, setActiveView] = useState<ActiveView>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_VIEW);
      if (saved === 'fundamentals' || saved === 'course') return saved;
    } catch (e) {
      // ignore
    }
    return 'course';
  });

  const [activeSemesterId, setActiveSemesterId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_SEMESTER);
      if (saved) return saved;
    } catch (e) {
      // ignore
    }
    return INITIAL_SEMESTERS[0]?.id || 'sem-1-fall-26';
  });

  const [activeCourseId, setActiveCourseId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_COURSE);
      if (saved) return saved;
    } catch (e) {
      // ignore
    }
    return INITIAL_SEMESTERS[0]?.courses[0]?.id || 'cmpe-252-sec-04';
  });

  const [activeTab, setActiveTab] = useState<SubTabType>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_TAB) as SubTabType;
      if (saved && ['class', 'mylearning', 'project', 'presentation'].includes(saved)) {
        return saved;
      }
    } catch (e) {
      // ignore
    }
    return 'class';
  });

  const [customNotes, setCustomNotes] = useState<CustomUserNote[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_NOTES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return [];
  });

  // Persist state changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SEMESTERS, JSON.stringify(semesters));
  }, [semesters]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FUNDAMENTALS, JSON.stringify(fundamentals));
  }, [fundamentals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_VIEW, activeView);
  }, [activeView]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_SEMESTER, activeSemesterId);
  }, [activeSemesterId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_COURSE, activeCourseId);
  }, [activeCourseId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TAB, activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_NOTES, JSON.stringify(customNotes));
  }, [customNotes]);

  // Current active course object
  const currentSemester = semesters.find(s => s.id === activeSemesterId) || semesters[0];
  const currentCourse = currentSemester?.courses.find(c => c.id === activeCourseId) || currentSemester?.courses[0];

  // Actions
  const toggleConceptMastery = (courseId: string, conceptId: string) => {
    setSemesters(prev =>
      prev.map(sem => ({
        ...sem,
        courses: sem.courses.map(course => {
          if (course.id !== courseId) return course;
          return {
            ...course,
            concepts: course.concepts.map(concept =>
              concept.id === conceptId ? { ...concept, mastered: !concept.mastered } : concept
            )
          };
        })
      }))
    );
  };

  const toggleFundamentalMastery = (fundamentalId: string) => {
    setFundamentals(prev =>
      prev.map(item =>
        item.id === fundamentalId ? { ...item, mastered: !item.mastered } : item
      )
    );
  };

  const toggleDeliverable = (courseId: string, deliverableId: string) => {
    setSemesters(prev =>
      prev.map(sem => ({
        ...sem,
        courses: sem.courses.map(course => {
          if (course.id !== courseId) return course;
          return {
            ...course,
            project: {
              ...course.project,
              deliverables: course.project.deliverables.map(deliv =>
                deliv.id === deliverableId ? { ...deliv, completed: !deliv.completed } : deliv
              )
            }
          };
        })
      }))
    );
  };

  const addCustomNote = (note: Omit<CustomUserNote, 'id' | 'createdAt'>) => {
    const newNote: CustomUserNote = {
      ...note,
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setCustomNotes(prev => [newNote, ...prev]);
  };

  const resetToDefaults = () => {
    if (window.confirm('Reset all course notes, checks, and data back to defaults?')) {
      localStorage.clear();
      setSemesters(INITIAL_SEMESTERS);
      setFundamentals(INITIAL_FUNDAMENTALS);
      setCustomNotes([]);
      setActiveSemesterId(INITIAL_SEMESTERS[0].id);
      setActiveCourseId(INITIAL_SEMESTERS[0].courses[0].id);
      setActiveTab('class');
      setActiveView('course');
    }
  };

  return {
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
    resetToDefaults
  };
}