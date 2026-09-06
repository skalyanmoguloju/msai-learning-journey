export type SubTabType = 'class' | 'mylearning' | 'project' | 'presentation';

export type ActiveView = 'fundamentals' | 'course';

export interface SyllabusModule {
  id: string;
  week: string;
  title: string;
  description: string;
  topics: string[];
  status: 'completed' | 'in-progress' | 'upcoming';
  reading?: string;
}

export interface MathFormulaItem {
  title: string;
  latex: string;
  explanation: string;
}

export interface CodeSnippetItem {
  title: string;
  language: string;
  code: string;
}

export interface LectureNote {
  id: string;
  title: string;
  week: string;
  date: string;
  summary: string;
  keyPoints: string[];
  mathFormulas: MathFormulaItem[];
  codeSnippets: CodeSnippetItem[];
  tags: string[];
}

export interface ConceptItem {
  id: string;
  name: string;
  category: string;
  mastered: boolean;
  description: string;
}

export interface PipelineStep {
  step: number;
  title: string;
  description: string;
  tool: string;
}

export interface MetricCard {
  label: string;
  value: string;
  baseline?: string;
  change?: string;
}

export interface DeliverableItem {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

export interface CourseProject {
  title: string;
  subtitle: string;
  abstract: string;
  problemStatement: string;
  pipelineSteps: PipelineStep[];
  techStack: string[];
  metrics: MetricCard[];
  githubUrl: string;
  demoUrl: string;
  datasetInfo: string;
  deliverables: DeliverableItem[];
}

export interface PresentationSlide {
  slideNumber: number;
  title: string;
  subtitle: string;
  bulletPoints: string[];
  callout?: string;
  speakerNotes: string;
}

export interface QAChecklistItem {
  question: string;
  answer: string;
}

export interface CoursePresentation {
  title: string;
  slidesCount: number;
  slides: PresentationSlide[];
  videoUrl: string;
  executiveSummary: string;
  keyFindings: string[];
  qaChecklist: QAChecklistItem[];
}

export interface Course {
  id: string;
  code: string;
  section: string;
  name: string;
  canvasUrl?: string;
  instructor: {
    name: string;
    email: string;
    officeHours: string;
  };
  schedule: string;
  credits: number;
  grading: { item: string; weight: number }[];
  textbooks: { title: string; author: string; link?: string }[];
  modules: SyllabusModule[];
  concepts: ConceptItem[];
  notes: LectureNote[];
  project: CourseProject;
  presentation: CoursePresentation;
}

export interface Semester {
  id: string;
  name: string;
  isCurrent: boolean;
  courses: Course[];
}

export interface FundamentalTopic {
  id: string;
  category: 'Math for AI' | 'Scientific Computing' | 'Core AI & ML' | 'Data Engineering' | 'AI Ethics & Rigor';
  title: string;
  summary: string;
  mastered: boolean;
  keyFormulas: MathFormulaItem[];
  codeExample?: CodeSnippetItem;
  coreTakeaways: string[];
  recommendedResources: { name: string; url: string }[];
}

export interface CustomUserNote {
  id: string;
  context: 'fundamentals' | string; // courseId or 'fundamentals'
  title: string;
  content: string;
  latex?: string;
  category: string;
  createdAt: string;
}