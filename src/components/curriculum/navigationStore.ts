/**
 * In-Memory Curriculum Navigation Store
 *
 * Preserves selection states across course, week, root learning hub,
 * and interactive tool transitions during a session.
 * State is stored in runtime memory only and automatically resets upon page refresh.
 */

// Per-course active subtab ('class' | 'mylearning' | 'project' | 'presentation')
const selectedTabByCourse: Record<string, string> = {};

// Per-course active presentation slide index
const selectedSlideByCourse: Record<string, number> = {};

// Per-course active week ID (e.g. { 'cmpe-252-sec-04': 'week-02', 'cmpe-257-sec-02': 'week-03' })
const selectedWeekByCourse: Record<string, string> = {};

// Per-week active module/step ID (e.g. { 'cmpe-252_week-01': 3, 'cmpe-257_week-01': 'm2' })
const selectedModuleByWeek: Record<string, string | number> = {};

// Per-week active main tab ('study' | 'quiz')
const selectedTabByWeek: Record<string, 'study' | 'quiz'> = {};

// Per-week solutions mode ('true' for Full Solution Guide, 'false' for Practice Quizzes)
const selectedSolutionsModeByWeek: Record<string, boolean> = {};

// Root learning view active subtab ('calculus-mastery' | 'statistics-mastery' | 'linear-algebra-mastery')
let rootLearningActiveTab: string = 'calculus-mastery';

// Per-root hub active main tab ('study' | 'quiz' | etc.)
const selectedTabByRootHub: Record<string, string> = {};

// Per-root hub active study module ID
const selectedModuleByRootHub: Record<string, string | number> = {};

// Per-root hub active quiz module key
const selectedQuizModuleByRootHub: Record<string, string> = {};

// Per-root hub solutions mode
const selectedSolutionsModeByRootHub: Record<string, boolean> = {};

// Interactive Quiz Template: active question index per module per quiz storage key
// { [storageKey]: { [moduleId]: questionIndex } }
const quizQuestionIndicesByStorageKey: Record<string, Record<string, number>> = {};

// Interactive Quiz Template: active module per quiz storage key
const quizActiveModuleByStorageKey: Record<string, string> = {};

export const curriculumNavStore = {
  // Course -> Active Tab ('class' | 'mylearning' | 'project' | 'presentation')
  getTabForCourse: (courseId: string, defaultTab: string = 'class'): string => {
    return selectedTabByCourse[courseId] || defaultTab;
  },
  setTabForCourse: (courseId: string, tab: string) => {
    selectedTabByCourse[courseId] = tab;
  },

  // Course -> Presentation Slide Index
  getSlideForCourse: (courseId: string, defaultSlide: number = 0): number => {
    return selectedSlideByCourse[courseId] ?? defaultSlide;
  },
  setSlideForCourse: (courseId: string, slideIndex: number) => {
    selectedSlideByCourse[courseId] = slideIndex;
  },

  // Course -> Active Week
  getWeekForCourse: (courseId: string, defaultWeekId: string): string => {
    return selectedWeekByCourse[courseId] || defaultWeekId;
  },
  setWeekForCourse: (courseId: string, weekId: string) => {
    selectedWeekByCourse[courseId] = weekId;
  },

  // Week -> Active Module / Step
  getModuleForWeek: <T extends string | number>(weekKey: string, defaultModuleId: T): T => {
    return (selectedModuleByWeek[weekKey] as T) ?? defaultModuleId;
  },
  setModuleForWeek: (weekKey: string, moduleId: string | number) => {
    selectedModuleByWeek[weekKey] = moduleId;
  },

  // Week -> Active Tab ('study' | 'quiz')
  getMainTabForWeek: (weekKey: string, defaultTab: 'study' | 'quiz' = 'study'): 'study' | 'quiz' => {
    return selectedTabByWeek[weekKey] || defaultTab;
  },
  setMainTabForWeek: (weekKey: string, tab: 'study' | 'quiz') => {
    selectedTabByWeek[weekKey] = tab;
  },

  // Week -> Solutions Mode (Practice Quizzes vs Full Solution Guide)
  getSolutionsModeForWeek: (weekKey: string): boolean => {
    return Boolean(selectedSolutionsModeByWeek[weekKey]);
  },
  setSolutionsModeForWeek: (weekKey: string, show: boolean) => {
    selectedSolutionsModeByWeek[weekKey] = show;
  },

  // Root Foundation Hub Subtab
  getRootLearningTab: (): string => rootLearningActiveTab,
  setRootLearningTab: (tab: string) => {
    rootLearningActiveTab = tab;
  },

  // Root Learning Hubs: Active Tab / Tool ('study' | 'quiz' | etc.)
  getTabForRootHub: (hubKey: string, defaultTab: string = 'study'): string => {
    return selectedTabByRootHub[hubKey] || defaultTab;
  },
  setTabForRootHub: (hubKey: string, tab: string) => {
    selectedTabByRootHub[hubKey] = tab;
  },

  // Root Learning Hubs: Active Study Module
  getModuleForRootHub: <T extends string | number>(hubKey: string, defaultMod: T): T => {
    return (selectedModuleByRootHub[hubKey] as T) ?? defaultMod;
  },
  setModuleForRootHub: (hubKey: string, mod: string | number) => {
    selectedModuleByRootHub[hubKey] = mod;
  },

  // Root Learning Hubs: Active Quiz Module
  getQuizModuleForRootHub: (hubKey: string, defaultMod: string = 'm1'): string => {
    return selectedQuizModuleByRootHub[hubKey] || defaultMod;
  },
  setQuizModuleForRootHub: (hubKey: string, mod: string) => {
    selectedQuizModuleByRootHub[hubKey] = mod;
  },

  // Root Learning Hubs: Solutions Mode
  getSolutionsModeForRootHub: (hubKey: string): boolean => {
    return Boolean(selectedSolutionsModeByRootHub[hubKey]);
  },
  setSolutionsModeForRootHub: (hubKey: string, show: boolean) => {
    selectedSolutionsModeByRootHub[hubKey] = show;
  },

  // Interactive Quizzes: Question Indices
  getQuizQuestionIndices: (storageKey: string): Record<string, number> => {
    return quizQuestionIndicesByStorageKey[storageKey] || {};
  },
  setQuizQuestionIndex: (storageKey: string, moduleKey: string, questionIdx: number) => {
    if (!quizQuestionIndicesByStorageKey[storageKey]) {
      quizQuestionIndicesByStorageKey[storageKey] = {};
    }
    quizQuestionIndicesByStorageKey[storageKey][moduleKey] = questionIdx;
  },

  // Interactive Quizzes: Active Module
  getQuizModule: (storageKey: string, defaultMod: string = ''): string => {
    return quizActiveModuleByStorageKey[storageKey] || defaultMod;
  },
  setQuizModule: (storageKey: string, mod: string) => {
    quizActiveModuleByStorageKey[storageKey] = mod;
  },
};
